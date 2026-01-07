using EcommerceProject.Models.DTOs.ProductAttribute;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IProductAttributeRepository
    {
        Task<int> CreateAttributeAsync(string name, bool isVariant, CancellationToken ct);
        Task<int> CreateValueAsync(int attributeId, string value, CancellationToken ct);
        Task<List<ProductAttributeDto>> GetAllAsync(CancellationToken ct);
        Task<bool> UpdateAttributeAsync(int attributeId, string name, bool isVariant, CancellationToken ct);
        Task<bool> UpdateValueAsync(int attributeValueId, string value, CancellationToken ct);

    }
}
