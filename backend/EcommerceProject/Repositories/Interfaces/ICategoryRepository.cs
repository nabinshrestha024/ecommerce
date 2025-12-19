using EcommerceProject.Models.DTOs.Category;
using EcommerceProject.Models.Entities;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllAsync(CategoryFilterDto filter);
        Task<IEnumerable<Category>> AdminGetAllAsync(AdminCategoryFilterDto filter);

        Task<int> CreateAsync(CategoryUpsertDto dto);
        Task UpdateAsync(int id, CategoryUpsertDto dto);
        Task DeleteAsync(int id);
    }
}
