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

        public ProductService(IProductRepository repo, IFileStorageService files)
        {
            _repo = repo;
            _files = files;
        }

        public Task<PagedResult<ProductListItemDto>> GetPagedAsync(int? categoryId, string? search, int page, int pageSize, CancellationToken ct)
        {
            return _repo.GetPagedAsync(categoryId, search, page, pageSize, onlyActive: true, ct);
        }
       

        public Task<ProductDetailsDto?> GetDetailsAsync(string slugOrId, CancellationToken ct)
        {
            return _repo.GetBySlugOrIdAsync(slugOrId, onlyActive: true, ct);
        }
        


        public Task<PagedResult<ProductListItemDto>> AdminGetProductsAsync(AdminProductFilterDto filter, PaginationDto pagination, CancellationToken ct)
        {
            return _repo.GetPagedAsync(
                filter.CategoryId,
                filter.Search,
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
            var slug = await GenerateUniqueSlugAsync(dto.Name, ct);
            var sku = SkuGenerator.Generate();

            var productId = await _repo.CreateAsync(
                dto.CategoryId,
                dto.Name,
                slug,
                dto.Description,
                dto.ShortDescription,
                dto.Price,
                dto.StockQuantity,
                sku,
                dto.IsActive,
                ct
            );
            if (images is not { Count: > 0 })
                return productId;

            var urls = await _files.SaveProductImagesAsync(images, ct);

            for (int i = 0; i < urls.Count; i++)
            {
                bool isPrimary = primaryIndex.HasValue
                    ? i == primaryIndex.Value
                    : i == 0; 

                await _repo.InsertImageAsync(
                    productId,
                    urls[i],
                    isPrimary,
                    i, 
                    ct
                );
            }

            return productId;
        }


        public async Task<bool> UpdateAsync(int id, ProductUpdateDto dto, IFormFileCollection? images, int? primaryIndex, CancellationToken ct)
        {
            await new ProductUpdateValidator().ValidateAndThrowAsync(dto, ct);

            var existing = await _repo.GetByIdAsync(id, ct);
            if (existing == null)
                return false;
            string slug;
            if (!string.Equals(existing.Name, dto.Name, StringComparison.OrdinalIgnoreCase))
            {
                slug = await GenerateUniqueSlugAsync(dto.Name, ct);
            }
            else
            {
                slug = existing.Slug;
            }
            dto.Slug = slug;

            var ok = await _repo.UpdateAsync(id, dto, ct);
            if (!ok) return false;

            if (images is { Count: > 0 })
            {
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
