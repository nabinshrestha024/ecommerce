using System.Data;
using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Product;
using EcommerceProject.Models.Entities;
using EcommerceProject.Repositories.Interfaces;

namespace EcommerceProject.Repositories.Implementations
{
    public class ProductRepository : IProductRepository
    {
        private readonly ISqlConnectionFactory _factory;
        private readonly ITagRepository _tagRepository;
        public ProductRepository(ISqlConnectionFactory factory, ITagRepository tagRepository)
        {
            _factory = factory;
            _tagRepository = tagRepository;
        }

        public async Task<ProductCatalogResponse> GetPagedAsync(int? categoryId, string? search, List<string>? tags, decimal? minPrice, decimal? maxPrice, int page, int pageSize, bool onlyActive, CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            var p = new
            {
                CategoryId = categoryId,
                Search = search,
                TagNames = tags != null && tags.Any() ? string.Join(",", tags) : null,
                MinPrice = minPrice,
                MaxPrice = maxPrice,
                Page = page,
                PageSize = pageSize,
                OnlyActive = onlyActive
            };

            using var multi = await conn.QueryMultipleAsync(
                "spProducts_GetPaged", p, commandType: CommandType.StoredProcedure
            );

            var products = (await multi.ReadAsync<ProductListItemDto>()).ToList();
            var allVariants = (await multi.ReadAsync<ProductVariantDto>()).ToList();
            var allAttributes = (await multi.ReadAsync<AttributeMapping>()).ToList();
            var allImages = (await multi.ReadAsync<ProductImageDto>()).ToList();

            int totalCount = 0;
            if (!multi.IsConsumed)
            {
                totalCount = await multi.ReadFirstOrDefaultAsync<int>();
            }

            decimal highestPrice = 0;
            if (!multi.IsConsumed)
            {
                highestPrice = await multi.ReadFirstOrDefaultAsync<decimal>();
            }

            foreach (var product in products)
            {
                product.Images = allImages.Where(i => i.ProductId == product.ProductId).ToList();

                product.Variants = allVariants.Where(v => v.ProductId == product.ProductId).ToList();

                product.Tags = await _tagRepository.GetByProductIdAsync(product.ProductId, ct);


                foreach (var variant in product.Variants)
                {
                    variant.Attributes = allAttributes
                        .Where(a => a.VariantId == variant.VariantId)
                        .GroupBy(a => string.IsNullOrEmpty(a.AttributeName) ? "Unknown" : a.AttributeName)
                        .ToDictionary(
                            g => g.Key,
                            g => g.First().AttributeValue ?? ""
                        );
                }
                product.AvailableAttributes = allAttributes
                    .Where(a => product.Variants.Any(v => v.VariantId == a.VariantId) && !string.IsNullOrEmpty(a.AttributeName))
                    .GroupBy(a => a.AttributeName)
                    .Select(g => new ProductAttributeSummaryDto
                    {
                        Name = g.Key,
                        Values = g.Select(v => v.AttributeValue!).Distinct().OrderBy(v => v).ToList()
                    })
                    .ToList();

                product.Tags = await _tagRepository.GetByProductIdAsync(product.ProductId, ct);


                if (product.Variants.Any())
                {
                    var defaultVar = product.Variants.FirstOrDefault(v => v.IsDefault) ?? product.Variants.First();

                    product.Price = defaultVar.Price;
                    product.FinalPrice = defaultVar.FinalPrice;

                    product.StockQuantity = defaultVar.StockQuantity;
                }

            }
            return new ProductCatalogResponse(products, page, pageSize, totalCount, highestPrice);
        }

        public async Task<int?> GetMaxSlugSuffixAsync(string baseSlug, CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            return await conn.ExecuteScalarAsync<int?>(
               "spProducts_GetMaxSlugSuffix",
                new { BaseSlug = baseSlug },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task InsertImageAsync(int productId, string imageUrl, bool isPrimary, int sortOrder, CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            await conn.ExecuteAsync(
                "spProductImages_Insert",
                new
                {
                    ProductId = productId,
                    ImageUrl = imageUrl,
                    IsPrimary = isPrimary,
                    SortOrder = sortOrder
                },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<int> DeleteImagesByProductIdAsync(int productId, CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            var deleted = await conn.ExecuteScalarAsync<int>(
                new CommandDefinition(
                    "spProductImages_DeleteByProductId",
                    new { ProductId = productId },
                    commandType: CommandType.StoredProcedure,
                    cancellationToken: ct
                )
            );

            return deleted;
        }

        public async Task<ProductDetailsDto?> GetBySlugOrIdAsync(string slugOrId, bool onlyActive, bool includeInactiveVariants, CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            using var multi = await conn.QueryMultipleAsync(
                "spProducts_GetBySlugOrId",
                new { SlugOrId = slugOrId, OnlyActive = onlyActive, IncludeInactiveVariants = includeInactiveVariants },
                commandType: CommandType.StoredProcedure
            );

            var product = await multi.ReadFirstOrDefaultAsync<ProductDetailsDto>();
            if (product is null) return null;

            var variants = (await multi.ReadAsync<ProductVariantDto>()).ToList();

            var attributeLinks = (await multi.ReadAsync<AttributeMapping>()).ToList();

            product.Tags = await _tagRepository.GetByProductIdAsync(product.ProductId, ct);

            foreach (var variant in variants)
            {
                variant.Attributes = attributeLinks
                    .Where(a => a.VariantId == variant.VariantId)
                    .GroupBy(a => a.AttributeName)
                    .ToDictionary(
                        g => g.Key,
                        g => g.First().AttributeValue ?? ""
                    );
            }

            product.Variants = variants;

            product.Images = (await multi.ReadAsync<ProductImageDto>()).ToList();

            product.AvailableAttributes = attributeLinks
                .GroupBy(a => a.AttributeName)
                .Select(g => new ProductAttributeSummaryDto
                {
                    Name = g.Key,
                    Values = g.Where(v => v.AttributeValue != null)
                            .Select(v => v.AttributeValue!)
                            .Distinct()
                            .OrderBy(v => v)
                            .ToList()
                })
                .ToList();
            product.Tags = await _tagRepository.GetByProductIdAsync(product.ProductId, ct);

            return product;
        }

        public async Task<int> CreateAsync(
            int categoryId,
            string name,
            string slug,
            string? description,
            string? shortDescription,
            bool hasVariants,
            bool isActive,
            List<int> attributeIds,
            CancellationToken ct
        )
        {
            using var conn = _factory.CreateConnection();

            return await conn.ExecuteScalarAsync<int>(
                "spProducts_Create",
                new
                {
                    CategoryId = categoryId,
                    Name = name,
                    Slug = slug,
                    Description = description,
                    ShortDescription = shortDescription,
                    HasVariants = hasVariants,
                    IsActive = isActive,
                    AttributeIds = (attributeIds != null && attributeIds.Any())
                                    ? string.Join(",", attributeIds)
                                    : null
                },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<int> GetAttributeIdByNameAsync(string name)
        {
            using var conn = _factory.CreateConnection();
            return await conn.QueryFirstOrDefaultAsync<int>(
                "SELECT AttributeId FROM ProductAttributes WHERE Name = @name",
                new { name });
        }

        public async Task<bool> UpdateAsync(int productId, int categoryId, string name, string slug, string? description, string? shortDescription, bool isActive, CancellationToken ct)

        {
            using var conn = _factory.CreateConnection();

            var affected = await conn.ExecuteScalarAsync<int>(
                new CommandDefinition(
                    "spProducts_Update",
                    new
                    {
                        ProductId = productId,
                        CategoryId = categoryId,
                        Name = name,
                        Slug = slug,
                        Description = description,
                        ShortDescription = shortDescription,
                        IsActive = isActive
                    },
                    commandType: CommandType.StoredProcedure,
                    cancellationToken: ct
                )
            );

            return affected > 0;
        }
        public async Task<ProductDetailsDto?> GetByIdAsync(int productId, CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            return await conn.QueryFirstOrDefaultAsync<ProductDetailsDto>(
                "spProducts_GetById",
                new { ProductId = productId },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<bool> DeleteAsync(int id, CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            var p = new DynamicParameters();
            p.Add("@ProductId", id);

            var affected = await conn.ExecuteScalarAsync<int>(
                new CommandDefinition("spProducts_Delete", p, commandType: CommandType.StoredProcedure, cancellationToken: ct)
            );

            return affected > 0;
        }

        public async Task InsertImagesBulkAsync(int productId, IReadOnlyList<(string url, bool isPrimary, int sortOrder)> images, CancellationToken ct)
        {
            if (images.Count == 0) return;

            using var conn = _factory.CreateConnection();


            foreach (var img in images)
            {
                await conn.ExecuteAsync(
                    "spProductImages_Insert",
                    new
                    {
                        ProductId = productId,
                        ImageUrl = img.url,
                        IsPrimary = img.isPrimary,
                        SortOrder = img.sortOrder
                    },
                    commandType: CommandType.StoredProcedure
                );
            }

        }

        public async Task<int?> GetProductIdByNameAsync(string productName)
        {
            return await _factory.CreateConnection().QueryFirstOrDefaultAsync<int?>(
                "spProduct_GetIdByName",
                new { ProductName = productName },
                commandType: CommandType.StoredProcedure
            );
        }

        // helper functions
        private class AttributeMapping
        {
            public int VariantId { get; set; }
            public int ProductId { get; set; }
            public string AttributeName { get; set; } = default!;
            public string AttributeValue { get; set; } = default!;
        }
        public async Task<int> GetAttributeValueIdAsync(int attributeId, string value)
        {
            using var conn = _factory.CreateConnection();
            return await conn.QueryFirstOrDefaultAsync<int>(
                "SELECT AttributeValueId FROM ProductAttributeValues WHERE AttributeId = @attributeId AND Value = @value",
                new { attributeId, value });
        }

        public async Task<List<int>> GetRelatedProductIdsAsync(int categoryId, int excludeProductId, int take, CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            var ids = await conn.QueryAsync<int>(
                new CommandDefinition(
                    "spProducts_GetRelatedIdsByCategory",
                    new
                    {
                        CategoryId = categoryId,
                        ExcludeProductId = excludeProductId,
                        Take = take
                    },
                    commandType: CommandType.StoredProcedure,
                    cancellationToken: ct
                )
            );

            return ids.ToList();
        }

    }
}
