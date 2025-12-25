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
        public ProductRepository(ISqlConnectionFactory factory)
        {
            _factory = factory;
        }
        public async Task<PagedResult<ProductListItemDto>> GetPagedAsync(int? categoryId, string? search, int page, int pageSize, bool onlyActive, CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            var p = new DynamicParameters();
            p.Add("@CategoryId", categoryId);
            p.Add("@Search", search);
            p.Add("@Page", page);
            p.Add("@PageSize", pageSize);
            p.Add("@OnlyActive", onlyActive);

            using var multi = await conn.QueryMultipleAsync(
                new CommandDefinition("spProducts_GetPaged", p, commandType: CommandType.StoredProcedure, cancellationToken: ct)
            );

            var items = (await multi.ReadAsync<ProductListItemDto>()).ToList();
            var total = await multi.ReadFirstAsync<int>();

            return new PagedResult<ProductListItemDto>
            (
                items,
                page,
                pageSize,
                total
            );
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

        public async Task InsertImageAsync(int productId, string imageUrl, bool isPrimary,int sortOrder,CancellationToken ct)
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

        public async Task<ProductDetailsDto?> GetBySlugOrIdAsync(string slugOrId, bool onlyActive, CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            var p = new DynamicParameters();
            p.Add("@SlugOrId", slugOrId);
            p.Add("@OnlyActive", onlyActive);

            using var multi = await conn.QueryMultipleAsync(
                new CommandDefinition("dbo.spProducts_GetBySlugOrId", p, commandType: CommandType.StoredProcedure, cancellationToken: ct)
            );

            var product = await multi.ReadFirstOrDefaultAsync<ProductDetailsDto>();
            if (product is null) return null;

            var images = (await multi.ReadAsync<ProductImageDto>()).ToList();
            product.Images = images;
            return product;
        }

        public async Task<int> CreateAsync(int categoryId, string name, string slug, string? description, string? shortDescription, decimal price, int stockQuantity, string sku, bool isActive, CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            var p = new DynamicParameters();
            p.Add("@CategoryId", categoryId);
            p.Add("@Name", name);
            p.Add("@Slug", slug);
            p.Add("@Description", description);
            p.Add("@ShortDescription", shortDescription);
            p.Add("@Price", price);
            p.Add("@StockQuantity", stockQuantity);
            p.Add("@SKU", sku);
            p.Add("@IsActive", isActive);
            return await conn.ExecuteScalarAsync<int>(
                "spProducts_Create",
                 p,
                 commandType: CommandType.StoredProcedure
            );
        }

        public async Task<bool> UpdateAsync(int id, ProductUpdateDto dto, CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            var p = new DynamicParameters(dto);
            p.Add("@ProductId", id);

            var affected = await conn.ExecuteScalarAsync<int>(
                new CommandDefinition("spProducts_Update", p, commandType: CommandType.StoredProcedure, cancellationToken: ct)
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

        public async Task <int?>GetProductIdByNameAsync(string productName)
        {


            return await _factory.CreateConnection().QueryFirstOrDefaultAsync<int?>(
                "spProduct_GetIdByName",
                new { ProductName = productName },
                commandType: CommandType.StoredProcedure
            );
        }
    }
}
