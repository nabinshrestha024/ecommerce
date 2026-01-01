using EcommerceProject.Models.DTOs.ProductAttribute;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IProductAttributeRepository
    {
        Task<int> CreateAsync(string name, bool isVariant, CancellationToken ct);
        Task<int> CreateValueAsync(int attributeId, string value, CancellationToken ct);
        Task<List<ProductAttributeDto>> GetAllAsync(CancellationToken ct);
    }
}
