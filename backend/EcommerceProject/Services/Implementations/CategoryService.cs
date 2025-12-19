using EcommerceProject.Models.DTOs.Category;
using EcommerceProject.Models.Entities;
using EcommerceProject.Models.Validators.Category;
using EcommerceProject.Models.Validators.Product;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;

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


        public async Task<int> CreateAsync(CategoryUpsertDto dto, CancellationToken ct)
        {
            await new CategoryValidator().ValidateAsync(dto, ct);
            

            return await _repo.CreateAsync(dto);
        }
           

        public async Task UpdateAsync(int id, CategoryUpsertDto dto, CancellationToken ct)
        {
            await new CategoryValidator().ValidateAndThrowAsync(dto, ct);
            await _repo.UpdateAsync(id, dto);
        }
           

        public Task DeleteAsync(int id)
        {
            return _repo.DeleteAsync(id);
        }
    }
            

}
