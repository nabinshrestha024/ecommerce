using System.Data;
using EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Product;
using EcommerceProject.Models.Validators.Product;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using EcommerceProject.utils;
using FluentValidation;

namespace EcommerceProject.Services.Implementations
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repo;
        private readonly IFileStorageService _files;
        private readonly IProductVariantRepository _variantRepo;

        public ProductService(IProductRepository repo, IFileStorageService files, IProductVariantRepository variantRepo)
        {
            _repo = repo;
            _files = files;
            _variantRepo = variantRepo;
        }

        public Task<ProductCatalogResponse> GetPagedAsync(int? categoryId, string? search, List<string>? tagNames, decimal? minPrice, decimal? maxPrice, int page, int pageSize, CancellationToken ct)
        {
            return _repo.GetPagedAsync(categoryId, search, tagNames, minPrice, maxPrice, page, pageSize, onlyActive: true, ct);
        }
       
        public async Task<ProductDetailsDto?> GetDetailsAsync(string slugOrId, CancellationToken ct)
        {
            var product = await _repo.GetBySlugOrIdAsync(slugOrId, onlyActive: true, ct);
            if (product == null) return null;

            var relatedIds = await _repo.GetRelatedProductIdsAsync(
                product.CategoryId,
                product.ProductId,
                take: 5,
                ct
            );

            foreach (var id in relatedIds)
            {
                var related = await _repo.GetBySlugOrIdAsync(id.ToString(), onlyActive: true, ct);
                if (related != null)
                {
                    related.RelatedProducts.Clear();

                    product.RelatedProducts.Add(related);
                }
            }

            return product;
        }
        
        public Task<ProductCatalogResponse> AdminGetProductsAsync(AdminProductFilterDto filter, PaginationDto pagination, CancellationToken ct)
        {
            return _repo.GetPagedAsync(
                filter.CategoryId,
                filter.Search,
                filter.Tags,
                filter.MinPrice,
                filter.MaxPrice,
                pagination.Page,
                pagination.PageSize,
                filter.OnlyActive,
                ct
            );
        }

        
        private async Task<string> GenerateUniqueSlugAsync(string name, CancellationToken ct)
        {
            var baseSlug = SlugGenerator.Generate(name);

            var maxSuffix = await _repo.GetMaxSlugSuffixAsync(baseSlug, ct);

            if (maxSuffix == null)
                return baseSlug;          

            return $"{baseSlug}-{maxSuffix + 1}";
        }


        public async Task<int> CreateAsync(ProductCreateDto dto, IFormFileCollection? images, int? primaryIndex, CancellationToken ct)
        {
            await new ProductCreateValidator().ValidateAndThrowAsync(dto, ct);

            var attributeIds = new List<int>();
            if (dto.RequiredAttributeNames != null && dto.RequiredAttributeNames.Any())
            {
                foreach (var name in dto.RequiredAttributeNames)
                {
                    var id = await _repo.GetAttributeIdByNameAsync(name);
                    if (id > 0) attributeIds.Add(id);
                }
            }

            var slug = await GenerateUniqueSlugAsync(dto.Name, ct);

            var productId = await _repo.CreateAsync(
                dto.CategoryId,
                dto.Name,
                slug,
                dto.Description,
                dto.ShortDescription,
                dto.HasVariants,
                dto.IsActive,
                attributeIds,
                ct
            );

            if (images is not { Count: > 0 }) return productId;

            var urls = await _files.SaveProductImagesAsync(images, ct);
            for (int i = 0; i < urls.Count; i++)
            {
                await _repo.InsertImageAsync(
                    productId,
                    urls[i],
                    primaryIndex.HasValue ? i == primaryIndex.Value : i == 0,
                    i,
                    ct
                );
            }
            return productId;
        }

        public async Task<bool> UpdateAsync(int id, ProductUpdateDto dto, IFormFileCollection? images,int? primaryIndex, CancellationToken ct)
        {
            await new ProductUpdateValidator().ValidateAndThrowAsync(dto, ct);

            var existing = await _repo.GetByIdAsync(id, ct);
            if (existing == null)
                return false;

            var slug = !string.Equals(existing.Name, dto.Name, StringComparison.OrdinalIgnoreCase)
                ? (await GenerateUniqueSlugAsync(dto.Name, ct)).Trim()
                : existing.Slug;

            var ok = await _repo.UpdateAsync(
                id,
                dto.CategoryId,
                dto.Name,
                slug,
                dto.Description,
                dto.ShortDescription,
                dto.IsActive,
                ct
            );

            if (!ok) return false;

            if (images is { Count: > 0 })
            {
                await _repo.DeleteImagesByProductIdAsync(id, ct);

                var urls = await _files.SaveProductImagesAsync(images, ct);

                var bulk = urls.Select((url, i) => (
                    url,
                    isPrimary: primaryIndex.HasValue ? i == primaryIndex.Value : i == 0,
                    sortOrder: i
                )).ToList();

                await _repo.InsertImagesBulkAsync(id, bulk, ct);
            }

            return true;
        }

        public Task<bool> DeleteAsync(int id, CancellationToken ct)
        {
            return _repo.DeleteAsync(id, ct);
        }
    }
}
