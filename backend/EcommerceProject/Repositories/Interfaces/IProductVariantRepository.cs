namespace EcommerceProject.Repositories.Interfaces
{
    public interface IProductVariantRepository
    {
        Task<int> CreateAsync(
        int productId,
        string sku,
        decimal price,
        int stockQuantity,
        bool isDefault,
        bool isActive,
        CancellationToken ct
    );

        Task<bool> UpdateAsync(int variantId, decimal price, int stock, bool isActive, bool isDefault, CancellationToken ct);
        Task<bool> DeleteAsync(int variantId, CancellationToken ct);
        Task<bool> SetDefaultAsync(int variantId, CancellationToken ct);
        Task <bool> ExistsAsync(int variantId, CancellationToken ct);
    }
}
