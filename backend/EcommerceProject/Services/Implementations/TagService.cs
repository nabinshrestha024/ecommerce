using EcommerceProject.Models.DTOs.Tags;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;

namespace EcommerceProject.Services.Implementations
{
    public class TagService : ITagService
    {
        private readonly ITagRepository _repo;

        public TagService(ITagRepository repo)
        {
            _repo = repo;
        }

        public Task<int> CreateAsync(UpsertTagDto dto, CancellationToken ct)
        {
            return _repo.CreateAsync(dto.Name, ct);
        }
            

        public Task<List<TagDto>> GetAllAsync(CancellationToken ct)
        {
            return _repo.GetAllAsync(ct);
        }
           
        public Task AddToProductAsync(int productId, int tagId, CancellationToken ct)
        {
            return _repo.AddToProductAsync(productId, tagId, ct);
        }
          
        public Task<List<TagDto>> GetByProductIdAsync(int productId, CancellationToken ct)
        {
            return _repo.GetByProductIdAsync(productId, ct);
        }

        public Task<bool> UpdateAsync(int tagId, UpsertTagDto dto, CancellationToken ct)
        {
            return _repo.UpdateAsync(tagId, dto.Name, ct);
        }

        public Task RemoveFromProductAsync(int productId, int tagId, CancellationToken ct)
        {
            return _repo.RemoveFromProductAsync(productId, tagId, ct);
        }
           
    }

}
