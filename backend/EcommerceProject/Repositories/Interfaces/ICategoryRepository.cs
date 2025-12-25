using EcommerceProject.Models.DTOs.Category;
using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.Entities;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface ICategoryRepository
    {
        Task<PagedResult<Category>> GetAllAsync(CategoryFilterDto filter, PaginationDto pagination);
        Task<PagedResult<Category>> AdminGetAllAsync(AdminCategoryFilterDto filter, PaginationDto pagination);
        Task<Category?> GetByIdAsync(int categoryId, CancellationToken ct);
        Task<int?> GetMaxSlugSuffixAsync(string baseSlug, CancellationToken ct);
        Task<int> CreateAsync(CategoryUpsertDto dto);
        Task UpdateAsync(int id, CategoryUpsertDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
