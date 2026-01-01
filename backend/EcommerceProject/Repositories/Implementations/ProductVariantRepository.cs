using System.Data;
using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Repositories.Interfaces;

namespace EcommerceProject.Repositories.Implementations
{
    public class ProductVariantRepository : IProductVariantRepository
    {
        private readonly ISqlConnectionFactory _factory;

        public ProductVariantRepository(ISqlConnectionFactory factory)
        {
            _factory = factory;
        }

        public async Task<int> CreateAsync( int productId, string sku,  decimal price, int stockQuantity, bool isDefault, bool isActive, CancellationToken ct )
        {
            using var conn = _factory.CreateConnection();

            return await conn.ExecuteScalarAsync<int>(
                "spProductVariants_Create",
                new
                {
                    ProductId = productId,
                    SKU = sku,
                    Price = price,
                    StockQuantity = stockQuantity,
                    IsDefault = isDefault,
                    IsActive = isActive
                },
                commandType: CommandType.StoredProcedure
            );
        }
        public async Task<bool> UpdateAsync(int variantId, decimal price, int stock, bool isActive, bool isDefault, CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            var affected = await conn.ExecuteScalarAsync<int>(
                new CommandDefinition(
                    "spProductVariants_Update",
                    new
                    {
                        VariantId = variantId,
                        Price = price,
                        StockQuantity = stock,
                        IsActive = isActive,
                        IsDefault = isDefault
                    },
                    commandType: CommandType.StoredProcedure,
                    cancellationToken: ct
                )
            );

            return affected > 0;
        }


        public async Task<bool> SetDefaultAsync(int variantId, CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            var affected = await conn.ExecuteScalarAsync<int>(
                "spProductVariants_SetDefault",
                new { VariantId = variantId },
                commandType: CommandType.StoredProcedure
            );

            return affected > 0;
        }

        public async Task<bool> DeleteAsync(int variantId, CancellationToken ct)
        {
            using var conn = _factory.CreateConnection();

            var affected = await conn.ExecuteScalarAsync<int>(
                "spProductVariants_Delete",
                new { VariantId = variantId },
                commandType: CommandType.StoredProcedure
            );

            return affected > 0;
        }
    }

}
