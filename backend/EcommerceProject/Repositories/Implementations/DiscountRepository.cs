using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.Entities;
using EcommerceProject.Repositories.Interfaces;
using Microsoft.Data.SqlClient;
using System.Data;

namespace EcommerceProject.Repositories.Implementations
{
    public class DiscountRepository : IDiscountRepository
    {
        private readonly ISqlConnectionFactory _sqlConnectionFactory;

        public DiscountRepository(ISqlConnectionFactory sqlConnectionFactory)
        {
            _sqlConnectionFactory = sqlConnectionFactory;
        }

        public async Task<IEnumerable<Discount>> GetActiveDiscountsAsync(int productId)
        {
            using var connection = _sqlConnectionFactory.CreateConnection();
            var discount = await connection.QueryAsync<Discount>(
                "spDiscount_GetActiveDiscountsByProduct",
                new { ProductId = productId},
                commandType: CommandType.StoredProcedure);
            return discount;
        }

        public async Task<(int userUsage, int totalUsage)> GetUsageAsync(int discountId, int userId)
        {
            using var conn = _sqlConnectionFactory.CreateConnection();

            var usage = await conn.QuerySingleAsync<(int, int)>(
                "spDiscount_GetDiscountUsage",
                new { DiscountId = discountId, UserId = userId },
                commandType: CommandType.StoredProcedure
            );
            return usage;
        }

        public async Task AddUsageAsync(int discountId, int userId)
        {
            using var conn = _sqlConnectionFactory.CreateConnection();
            await conn.ExecuteAsync(
                "spDiscount_AddDiscountUsage",
                new { DiscountId = discountId, UserId = userId },
                commandType: CommandType.StoredProcedure
            );
        }
    }
}
