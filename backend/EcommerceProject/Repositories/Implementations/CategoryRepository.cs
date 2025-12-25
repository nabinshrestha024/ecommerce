using System.Data;
using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.Category;
using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
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

        public async Task<PagedResult<Category>> GetAllAsync(CategoryFilterDto filter, PaginationDto pagination)
        {
            using var conn = _connectionFactory.CreateConnection();

            using var multi = await conn.QueryMultipleAsync(
        "spCategories_GetAll",
        new
        {
            filter.Search,
            filter.OnlyActive,
            Page = pagination.Page,
            PageSize = pagination.PageSize
        },
        commandType: CommandType.StoredProcedure
    );

            var total = await multi.ReadSingleAsync<int>();
            var items = (await multi.ReadAsync<Category>()).ToList();

            return new PagedResult<Category>(
                items,
                pagination.Page,
                pagination.PageSize,
                total
            );
        }
        public async Task<Category?> GetByIdAsync(int categoryId, CancellationToken ct)
        {
            using var conn = _connectionFactory.CreateConnection();

            return await conn.QueryFirstOrDefaultAsync<Category>(
                "spCategories_GetById",
                new { CategoryId = categoryId },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<PagedResult<Category>> AdminGetAllAsync(AdminCategoryFilterDto filter, PaginationDto pagination)
        {
            using var conn = _connectionFactory.CreateConnection();

            using var multi = await conn.QueryMultipleAsync(
        "spCategories_Admin_GetAll",
        new
        {
            filter.Search,
            filter.IsActive,
            Page = pagination.Page,
            PageSize = pagination.PageSize
        },
        commandType: CommandType.StoredProcedure
    );

            var total = await multi.ReadSingleAsync<int>();
            var items = (await multi.ReadAsync<Category>()).ToList();

            return new PagedResult<Category>(
                items,
                pagination.Page,
                pagination.PageSize,
                total
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
        public async Task<int?> GetMaxSlugSuffixAsync(string baseSlug, CancellationToken ct)
        {
            using var conn = _connectionFactory.CreateConnection();

            return await conn.ExecuteScalarAsync<int?>(
                "spCategories_GetMaxSlugSuffix",
                new { BaseSlug = baseSlug },
                commandType: CommandType.StoredProcedure
            );
        }



        public async Task<bool> DeleteAsync(int id)
        {
            using var conn = _connectionFactory.CreateConnection();

            var rows = await conn.ExecuteAsync(
                "spCategories_Delete",
                new { CategoryId = id },
                commandType: CommandType.StoredProcedure
            );
            return rows > 0;
        }
    }

}
