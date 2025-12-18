using EcommerceProject.Models.DTOs.Category;
using EcommerceProject.Models.Entities;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;

namespace EcommerceProject.Services.Implementations
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repo;

        public CategoryService(ICategoryRepository repo)
        {
            _repo = repo;
        }

        public Task<IEnumerable<Category>> GetCategoriesAsync(CategoryFilterDto filter)
        {
            return _repo.GetAllAsync(filter);
        }
        public Task<IEnumerable<Category>> AdminGetCategoriesAsync(AdminCategoryFilterDto filter)
        {
            return _repo.AdminGetAllAsync(filter);
        }


        public Task<int> CreateAsync(CategoryUpsertDto dto)
        {
            return _repo.CreateAsync(dto);
        }
           

        public Task UpdateAsync(int id, CategoryUpsertDto dto)
        {
            return _repo.UpdateAsync(id, dto);
        }
           

        public Task DeleteAsync(int id)
        {
            return _repo.DeleteAsync(id);
        }
    }
            

}
