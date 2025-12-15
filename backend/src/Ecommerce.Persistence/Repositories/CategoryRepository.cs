using Dapper;
using Ecommerce.Application.Common.Interfaces;
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

        public async Task<int> CreateAsync(Category category)
        {
            using var conn = _context.CreateConnection();
            return await conn.ExecuteScalarAsync<int>(
                "catalog.sp_CreateCategory",
                category,
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> UpdateAsync(Category category)
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

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            using var conn = _context.CreateConnection();
            return await conn.QueryAsync<Category>(
                "catalog.sp_GetAllCategories",
                commandType: CommandType.StoredProcedure);
        }
    }
}
