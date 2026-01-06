using System.Data;
using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.Tags;
using EcommerceProject.Repositories.Interfaces;

namespace EcommerceProject.Repositories.Implementations
{
    public class TagRepository : ITagRepository
    {
        private readonly ISqlConnectionFactory _factory;

        public TagRepository(ISqlConnectionFactory factory)
        {
            _factory = factory;
        }

        public async Task<int> CreateAsync(string name, CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            return await conn.ExecuteScalarAsync<int>(
                "spTags_Create",
                new { Name = name.Trim() },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<List<TagDto>> GetAllAsync(CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            var tags = await conn.QueryAsync<TagDto>(
                "spTags_GetAll",
                commandType: CommandType.StoredProcedure
            );

            return tags.ToList();
        }

        public async Task AddToProductAsync(int productId, int tagId, CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            await conn.ExecuteAsync(
                "spProductTags_Add",
                new { ProductId = productId, TagId = tagId },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task RemoveFromProductAsync(int productId, int tagId, CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            await conn.ExecuteAsync(
                "spProductTags_Remove",
                new { ProductId = productId, TagId = tagId },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<List<TagDto>> GetByProductIdAsync(int productId, CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            var tags = await conn.QueryAsync<TagDto>(
                "spProductTags_GetByProductId",
                new { ProductId = productId },
                commandType: CommandType.StoredProcedure
            );

            return tags.ToList();
        }
    }

}
