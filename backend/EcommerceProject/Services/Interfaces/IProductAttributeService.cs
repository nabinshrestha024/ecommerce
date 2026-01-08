using EcommerceProject.Models.DTOs.ProductAttribute;

namespace EcommerceProject.Services.Interfaces
{
    public interface IProductAttributeService
    {
        Task<int> CreateAttributeAsync(UpsertAttributeDto dto, CancellationToken ct);
        Task<int> CreateValueAsync(int attributeId, UpsertAttributeValueDto dto, CancellationToken ct);
        Task<List<ProductAttributeDto>> GetAllAsync(CancellationToken ct);
        Task<bool> UpdateAttributeAsync(int attributeId, UpsertAttributeDto dto, CancellationToken ct);
        Task<bool> UpdateValueAsync(int attributeValueId, UpsertAttributeValueDto dto, CancellationToken ct);

    }
}
