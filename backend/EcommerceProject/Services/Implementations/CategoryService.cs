using EcommerceProject.Models.DTOs.Category;
using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
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

        public Task<PagedResult<Category>> GetCategoriesAsync(CategoryFilterDto filter, PaginationDto  pagination)
        {
            return _repo.GetAllAsync(filter, pagination);
        }
        public Task<PagedResult<Category>> AdminGetCategoriesAsync(AdminCategoryFilterDto filter, PaginationDto pagination)
        {
            return _repo.AdminGetAllAsync(filter, pagination);
        }


        public async Task<int> CreateAsync(CategoryUpsertDto dto, CancellationToken ct)
        {
            await new CategoryValidator().ValidateAndThrowAsync(dto, ct);
            

            return await _repo.CreateAsync(dto);
        }
           

        public async Task UpdateAsync(int id, CategoryUpsertDto dto, CancellationToken ct)
        {
            await new CategoryValidator().ValidateAndThrowAsync(dto, ct);
            await _repo.UpdateAsync(id, dto);
        }
           

        public Task<bool> DeleteAsync(int id)
        {
            return _repo.DeleteAsync(id);
        }
    }
            

}
