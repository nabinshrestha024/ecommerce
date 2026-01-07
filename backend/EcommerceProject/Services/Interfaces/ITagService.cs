using EcommerceProject.Models.DTOs.Tags;

namespace EcommerceProject.Services.Interfaces
{
    public interface ITagService
    {
        Task<int> CreateAsync(UpsertTagDto dto, CancellationToken ct);
        Task<List<TagDto>> GetAllAsync(CancellationToken ct);

        Task<List<TagDto>> GetByProductIdAsync(int productId, CancellationToken ct);
        Task<bool> UpdateAsync(int tagId, UpsertTagDto dto, CancellationToken ct);


        Task AddToProductAsync(int productId, int tagId, CancellationToken ct);
        Task RemoveFromProductAsync(int productId, int tagId, CancellationToken ct);
    }
}
