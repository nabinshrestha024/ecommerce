using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.Discount;
using EcommerceProject.Models.Entities;
using EcommerceProject.Repositories.Interfaces;
using System.Data;

namespace EcommerceProject.Repositories.Implementations
{
    public class AdminDiscountRepository : IAdminDiscountRepository
    {
        private readonly ISqlConnectionFactory _sqlConnectionFactory;

        public AdminDiscountRepository(ISqlConnectionFactory sqlConnectionFactory)
        {
            _sqlConnectionFactory = sqlConnectionFactory;
        }

        public async Task CreateAsync(CreateDiscountDto dto)
        {
            using var connection = _sqlConnectionFactory.CreateConnection();
            await connection.ExecuteAsync(
                "spDiscount_CreateDiscount",
                dto,
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateAsync(int discountId, CreateDiscountDto dto)
        {
            using var connection = _sqlConnectionFactory.CreateConnection();
            await connection.ExecuteAsync(
                "spDiscount_UpdateDiscount",
                new
                {
                    DiscountId = discountId,
                    dto.DiscountValue,
                    dto.IsPercentage,
                    dto.MinQuantity,
                    dto.StartDate,
                    dto.EndDate,
                    dto.MaxUsage,
                    dto.PerUserLimit

                },
                commandType:CommandType.StoredProcedure);
        }

        public async Task ToggleAsync(int discountId, bool isActive)
        {
            using var connection = _sqlConnectionFactory.CreateConnection();

            await connection.ExecuteAsync(
                "SpDiscount_ToggleDiscount",
                new
                {
                    DiscountId = discountId,
                    IsActive = isActive
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<Discount>> GetAllAsync()
        {
            using var conn = _sqlConnectionFactory.CreateConnection();
            var discount = await conn.QueryAsync<Discount>(
                "spDiscount_GellAllDiscounts",
                commandType: CommandType.StoredProcedure
                );

            return discount;
        }
    }
}
