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

        public Task<int> CreateAsync(CreateTagDto dto, CancellationToken ct)
            => _repo.CreateAsync(dto.Name, ct);

        public Task<List<TagDto>> GetAllAsync(CancellationToken ct)
            => _repo.GetAllAsync(ct);

        public Task AddToProductAsync(int productId, int tagId, CancellationToken ct)
            => _repo.AddToProductAsync(productId, tagId, ct);

        public Task<List<TagDto>> GetByProductIdAsync(int productId, CancellationToken ct)
    => _repo.GetByProductIdAsync(productId, ct);

        public Task RemoveFromProductAsync(int productId, int tagId, CancellationToken ct)
            => _repo.RemoveFromProductAsync(productId, tagId, ct);
    }

}
