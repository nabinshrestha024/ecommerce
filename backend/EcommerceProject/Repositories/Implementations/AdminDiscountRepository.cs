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


        public async Task<IEnumerable<DiscountDto>> GetAllAsync()
        {

            using var connection = _sqlConnectionFactory.CreateConnection();
            return await connection.QueryAsync<DiscountDto>(
                "spDiscount_GetAll",
                commandType: CommandType.StoredProcedure);
        }
        public async Task CreateAsync(CreateDiscountDto dto)
        {
            using var connection = _sqlConnectionFactory.CreateConnection();
            await connection.ExecuteAsync(
                "spDiscount_Create",
                dto,
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateAsync(int discountId, CreateDiscountDto dto)
        {
            using var connection = _sqlConnectionFactory.CreateConnection();
            await connection.ExecuteAsync(
                "spDiscount_Update",
                new
                {
                    DiscountId = discountId,
                    dto.ProductId,
                    dto.Percentage,
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
                "spDiscount_ToggleStatus",
                new
                {
                    DiscountId = discountId,
                    IsActive = isActive
                },
                commandType: CommandType.StoredProcedure);
        }
    }
}
