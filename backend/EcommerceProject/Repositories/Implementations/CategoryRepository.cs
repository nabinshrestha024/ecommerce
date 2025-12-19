using System.Data;
using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.Category;
using EcommerceProject.Models.Entities;
using EcommerceProject.Repositories.Interfaces;

namespace EcommerceProject.Repositories.Implementations
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ISqlConnectionFactory _connectionFactory;

        public CategoryRepository(ISqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<Category>> GetAllAsync(CategoryFilterDto filter)
        {
            using var conn = _connectionFactory.CreateConnection();

            return await conn.QueryAsync<Category>(
                "spCategories_GetAll",
                new
                {
                    filter.Search,
                    filter.OnlyActive
                },
                commandType: CommandType.StoredProcedure
            );
        }
        public async Task<IEnumerable<Category>> AdminGetAllAsync(AdminCategoryFilterDto filter)
        {
            using var conn = _connectionFactory.CreateConnection();

            return await conn.QueryAsync<Category>(
                "spCategories_Admin_GetAll",
                new
                {
                    filter.Search,
                    filter.IsActive
                },
                commandType: CommandType.StoredProcedure
            );
        }


        public async Task<int> CreateAsync(CategoryUpsertDto dto)
        {
            using var conn = _connectionFactory.CreateConnection();

            return await conn.ExecuteScalarAsync<int>(
                "spCategories_Create",
                dto,
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task UpdateAsync(int id, CategoryUpsertDto dto)
        {
            using var conn = _connectionFactory.CreateConnection();

            await conn.ExecuteAsync(
                "spCategories_Update",
                new
                {
                    CategoryId = id,
                    dto.Name,
                    dto.Slug,
                    dto.CategoryImageURL,
                    dto.Description,
                    dto.IsFeatured,
                    dto.SortOrder,
                    dto.IsActive
                },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task DeleteAsync(int id)
        {
            using var conn = _connectionFactory.CreateConnection();

            await conn.ExecuteAsync(
                "spCategories_Delete",
                new { CategoryId = id },
                commandType: CommandType.StoredProcedure
            );
        }
    }

}
