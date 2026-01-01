using EcommerceProject.Models.DTOs.ProductAttribute;

namespace EcommerceProject.Services.Interfaces
{
    public interface IProductAttributeService
    {
        Task<int> CreateAsync(CreateAttributeDto dto, CancellationToken ct);
        Task<int> CreateValueAsync(int attributeId, string value, CancellationToken ct);
        Task<List<ProductAttributeDto>> GetAllAsync(CancellationToken ct);
    }
}
