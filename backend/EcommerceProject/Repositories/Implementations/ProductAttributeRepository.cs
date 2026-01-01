using System.Data;
using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.ProductAttribute;
using EcommerceProject.Repositories.Interfaces;

namespace EcommerceProject.Repositories.Implementations
{
    public class ProductAttributeRepository : IProductAttributeRepository
    {
        private readonly ISqlConnectionFactory _factory;

        public ProductAttributeRepository(ISqlConnectionFactory factory)
        {
            _factory = factory;
        }

        public async Task<int> CreateAsync(string name, bool isVariant, CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            return await conn.ExecuteScalarAsync<int>(
                new CommandDefinition(
                    "spProductAttributes_Create",
                    new { Name = name, IsVariant = isVariant },
                    commandType: CommandType.StoredProcedure,
                    cancellationToken: ct
                )
            );
        }

        public async Task<int> CreateValueAsync(int attributeId, string value, CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            return await conn.ExecuteScalarAsync<int>(
                new CommandDefinition(
                    "spProductAttributeValues_Create",
                    new { AttributeId = attributeId, Value = value },
                    commandType: CommandType.StoredProcedure,
                    cancellationToken: ct
                )
            );
        }

        public async Task<List<ProductAttributeDto>> GetAllAsync(CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            using var multi = await conn.QueryMultipleAsync(
                new CommandDefinition(
                    "spProductAttributes_GetAll",
                    commandType: CommandType.StoredProcedure,
                    cancellationToken: ct
                )
            );

            var attributes = (await multi.ReadAsync<ProductAttributeDto>()).ToList();
            var values = (await multi.ReadAsync<ProductAttributeValueDto>()).ToList();

            attributes.ForEach(a =>a.Values = values.Where(v => v.AttributeId == a.AttributeId).ToList()
);


            return attributes;
        }
    }

}
