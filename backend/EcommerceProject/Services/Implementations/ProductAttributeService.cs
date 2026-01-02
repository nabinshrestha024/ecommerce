using EcommerceProject.Models.DTOs.ProductAttribute;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;

namespace EcommerceProject.Services.Implementations
{
    public class ProductAttributeService : IProductAttributeService
    {
        private readonly IProductAttributeRepository _repo;

        public ProductAttributeService(IProductAttributeRepository repo)
        {
            _repo = repo;
        }

        public Task<int> CreateAttributeAsync(CreateAttributeDto dto, CancellationToken ct)
        {
            return _repo.CreateAttributeAsync(dto.Name.Trim(), dto.IsVariant, ct);

        }

        public Task<int> CreateValueAsync(int attributeId, string value, CancellationToken ct)
        {
            return _repo.CreateValueAsync(attributeId, value.Trim(), ct);
        }
            

        public Task<List<ProductAttributeDto>> GetAllAsync(CancellationToken ct)
        {
            return _repo.GetAllAsync(ct);
        }
           
    }

}
