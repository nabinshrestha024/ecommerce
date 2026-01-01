using EcommerceProject.Models.DTOs.Product;

namespace EcommerceProject.Services.Interfaces
{
    public interface IProductVariantService
    {
        Task<int> CreateAsync(int productId, ProductVariantCreateDto dto, CancellationToken ct);
        Task<bool> UpdateAsync(int variantId, ProductVariantUpdateDto dto, CancellationToken ct);
        Task<bool> SetDefaultAsync(int variantId, CancellationToken ct);
        Task<bool> DeleteAsync(int variantId, CancellationToken ct);
    }
}
