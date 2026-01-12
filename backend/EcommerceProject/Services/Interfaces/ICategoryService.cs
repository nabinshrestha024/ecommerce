using EcommerceProject.Models.DTOs.Category;
using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.Entities;

namespace EcommerceProject.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<PagedResult<Category>> GetCategoriesAsync(CategoryFilterDto filter, PaginationDto pagination);
        Task<PagedResult<Category>> AdminGetCategoriesAsync(AdminCategoryFilterDto filter, PaginationDto pagination);

        Task<int> CreateAsync(CategoryUpsertDto body, CancellationToken ct);
        Task UpdateAsync(int id, CategoryUpsertDto body, CancellationToken ct);
        Task<bool> DeleteAsync(int id);

        Task<Category?> GetByIdAsync(int id, CancellationToken ct);
    }
}
