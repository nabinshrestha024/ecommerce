using EcommerceProject.Models.DTOs.Tags;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface ITagRepository
    {
        Task<int> CreateAsync(string name, CancellationToken ct);
        Task<List<TagDto>> GetAllAsync(CancellationToken ct);

        Task AddToProductAsync(int productId, int tagId, CancellationToken ct);
        Task RemoveFromProductAsync(int productId, int tagId, CancellationToken ct);

        Task<List<TagDto>> GetByProductIdAsync(int productId, CancellationToken ct);
    }
}
