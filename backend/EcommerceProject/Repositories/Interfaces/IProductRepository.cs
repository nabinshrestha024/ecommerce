using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Product;
using EcommerceProject.Models.Entities;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IProductRepository
    {
        Task<PagedResult<Product>> GetPagedAsync(ProductFilterDto filter, CancellationToken ct);
        Task<Product?> GetByIdAsync(int productId, CancellationToken ct);

        Task<int> CreateAsync(CreateProductRequest req, CancellationToken ct);
        Task<bool> UpdateAsync(int productId, UpdateProductRequest req, CancellationToken ct);
        Task<bool> DeleteAsync(int productId, CancellationToken ct);
    }
}
