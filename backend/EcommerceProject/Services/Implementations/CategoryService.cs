using EcommerceProject.Models.DTOs.Category;
using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.Entities;
using EcommerceProject.Models.Validators.Category;
using EcommerceProject.Models.Validators.Product;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using EcommerceProject.utils;
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

        private async Task<string> GenerateUniqueCategorySlugAsync(string name, CancellationToken ct)
        {
            var baseSlug = SlugGenerator.Generate(name);

            var maxSuffix = await _repo.GetMaxSlugSuffixAsync(baseSlug, ct);
            if (maxSuffix == null)
                return baseSlug;

            return $"{baseSlug}-{maxSuffix + 1}";
        }


        public async Task<int> CreateAsync(CategoryUpsertDto body, CancellationToken ct)
        {
            var dto = new CategoryUpsertDto
            {
                Name = body.Name,
                CategoryImageURL = body.CategoryImageURL,
                Description = body.Description,
                IsFeatured = body.IsFeatured,
                SortOrder = body.SortOrder,
                IsActive = body.IsActive
            };
            dto.Slug = await GenerateUniqueCategorySlugAsync(dto.Name!, ct);
            await new CategoryValidator().ValidateAndThrowAsync(dto, ct);
            
            return await _repo.CreateAsync(dto);
        }
           

        public async Task UpdateAsync(int id, CategoryUpsertDto body, CancellationToken ct)
        {
            await new CategoryValidator().ValidateAndThrowAsync(body, ct);
            var existing = await _repo.GetByIdAsync(id, ct);
            if (existing == null)
                throw new Exception("Category not found");

            var dto = new CategoryUpsertDto
            {
                Name = body.Name,
                CategoryImageURL = body.CategoryImageURL,
                Description = body.Description,
                IsFeatured = body.IsFeatured,
                SortOrder = body.SortOrder,
                IsActive = body.IsActive
            };

            dto.Slug = !string.Equals(existing.Name, body.Name, StringComparison.OrdinalIgnoreCase)
                ? await GenerateUniqueCategorySlugAsync(body.Name, ct)
                : existing.Slug;
            await _repo.UpdateAsync(id, dto);
        }
           

        public Task<bool> DeleteAsync(int id)
        {
            return _repo.DeleteAsync(id);
        }
    }
            

}
