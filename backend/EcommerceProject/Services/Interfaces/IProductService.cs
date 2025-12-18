using EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Product;

namespace EcommerceProject.Services.Interfaces
{
    public interface IProductService
    {
        Task<PagedResult<ProductListItemDto>> CatalogListAsync(ProductFilterDto filter, CancellationToken ct);
        Task<ProductDetailDto?> GetDetailAsync(int productId, bool admin, CancellationToken ct);

        Task<int> CreateAsync(CreateProductRequest req, CancellationToken ct);
        Task<bool> UpdateAsync(int productId, UpdateProductRequest req, CancellationToken ct);
        Task<bool> DeleteAsync(int productId, CancellationToken ct);
    }
}
