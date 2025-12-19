using EcommerceProject.Models.DTOs.Category;
using EcommerceProject.Models.Entities;

namespace EcommerceProject.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetCategoriesAsync(CategoryFilterDto filter);
        Task<IEnumerable<Category>> AdminGetCategoriesAsync(AdminCategoryFilterDto filter);

        Task<int> CreateAsync(CategoryUpsertDto dto, CancellationToken ct);
        Task UpdateAsync(int id, CategoryUpsertDto dto, CancellationToken ct);
        Task DeleteAsync(int id);
    }
}
