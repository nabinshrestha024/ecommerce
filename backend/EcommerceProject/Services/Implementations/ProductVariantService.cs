using EcommerceProject.Models.DTOs.Product;
using EcommerceProject.Models.Validators.ProductVariant;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using EcommerceProject.utils;
using FluentValidation;

namespace EcommerceProject.Services.Implementations
{
    public class ProductVariantService : IProductVariantService
    {
        private readonly IProductVariantRepository _repo;

        public ProductVariantService(IProductVariantRepository repo)
        {
            _repo = repo;
        }

        public async Task<int> CreateAsync(
            int productId,
            ProductVariantCreateDto dto,
            CancellationToken ct
        )
        {
            await new ProductVariantCreateValidator().ValidateAndThrowAsync(dto, ct);

            var sku = SkuGenerator.Generate();
              
            return await _repo.CreateProductVariantAsync(
                productId,
                sku,
                dto.Price,
                dto.StockQuantity,
                dto.IsDefault,
                dto.IsActive,
                dto.AttributeValueIds, // added
                ct
            );
        }

        public async Task<bool> UpdateAsync(
            int variantId,
            ProductVariantUpdateDto dto,
            CancellationToken ct
        )
        {
            await new ProductVariantUpdateValidator().ValidateAndThrowAsync(dto, ct);
            return await _repo.UpdateAsync(
                variantId,
                dto.Price,
                dto.StockQuantity,
                dto.IsActive,
                dto.IsDefault,
                ct
            );
        }

        public async Task<bool> SetDefaultAsync(int variantId, CancellationToken ct)
        {
            return await _repo.SetDefaultAsync(variantId, ct);
        }

        public async Task<bool> DeleteAsync(int variantId, CancellationToken ct)
        {
            return await _repo.DeleteAsync(variantId, ct);
        }
    }
}
