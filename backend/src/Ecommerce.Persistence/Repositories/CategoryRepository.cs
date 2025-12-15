using Dapper;
using Ecommerce.Application.Common.Interfaces;
using Ecommerce.Application.DTOs.Category;
using Ecommerce.Domain.Entities;
using Ecommerce.Persistence.Context;
using System.Data;
namespace Ecommerce.Persistence.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DapperContext _context;

        public CategoryRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<int> CreateAsync(CreateCategoryDto category)
        {
            using var conn = _context.CreateConnection();
            return await conn.ExecuteScalarAsync<int>(
                "catalog.sp_CreateCategory",
                category,
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> UpdateAsync(UpdateCategoryDto category)
        {
            using var conn = _context.CreateConnection();
            return await conn.ExecuteAsync(
                "catalog.sp_UpdateCategory",
                category,
                commandType: CommandType.StoredProcedure) > 0;
        }

        public async Task<bool> DeleteAsync(int categoryId)
        {
            using var conn = _context.CreateConnection();
            return await conn.ExecuteAsync(
                "catalog.sp_DeleteCategory",
                new { CategoryId = categoryId },
                commandType: CommandType.StoredProcedure) > 0;
        }

        public async Task<Category?> GetByIdAsync(int categoryId)
        {
            using var conn = _context.CreateConnection();
            return await conn.QueryFirstOrDefaultAsync<Category>(
                "catalog.sp_GetCategoryById",
                new { CategoryId = categoryId },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<CategoryDto>> GetAllAsync(CategoryFilterDto filter)
        {
            using var conn = _context.CreateConnection();

            return await conn.QueryAsync<CategoryDto>(
                "catalog.sp_GetAllCategories",
                new
                {
                    IsActive = filter.IsActive,
                    Name = filter.Name
                },
                commandType: CommandType.StoredProcedure
            );
        }

    }
}
