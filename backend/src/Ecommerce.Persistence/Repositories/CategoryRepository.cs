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
                "sp_Categories_Create",
                category,
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> UpdateAsync(Category category)
        {
            using var conn = _context.CreateConnection();
            return await conn.ExecuteAsync(
                "sp_Categories_Update",
                category,
                commandType: CommandType.StoredProcedure) > 0;
        }

        public async Task<bool> DeleteAsync(int categoryId)
        {
            using var conn = _context.CreateConnection();
            return await conn.ExecuteAsync(
                "sp_Categories_Delete",
                new { CategoryId = categoryId },
                commandType: CommandType.StoredProcedure) > 0;
        }

        public async Task<Category?> GetByIdAsync(int categoryId)
        {
            using var conn = _context.CreateConnection();
            return await conn.QueryFirstOrDefaultAsync<Category>(
                "sp_Categories_GetById",
                new { CategoryId = categoryId },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            using var conn = _context.CreateConnection();
            return await conn.QueryAsync<Category>(
                "sp_Categories_GetAll",
                commandType: CommandType.StoredProcedure);
        }
    }
}
