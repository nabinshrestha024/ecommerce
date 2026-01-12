using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.Discount;
using EcommerceProject.Models.Entities;
using EcommerceProject.Repositories.Interfaces;
using System.Data;
using System.Data.Common;
using System.Transactions;

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

        public async Task AddDiscountToProductsAsync(int discountId, List<int> productIds)
        {
            using var connection = _sqlConnectionFactory.CreateConnection();
            foreach (var productId in productIds)
            {
                await connection.ExecuteAsync(
                    "spDiscount_AddToProducts",
                    new { DiscountId = discountId, ProductId = productId },
                    commandType: CommandType.StoredProcedure
                );
            }
        }

        public async Task AddDiscountToVariantsAsync(int discountId, List<int> variantIds)
        {
            using var connection = _sqlConnectionFactory.CreateConnection();
            foreach (var variantId in variantIds)
            {
                await connection.ExecuteAsync(
                    "spDiscount_AddToVariants",
                    new { DiscountId = discountId, VariantId = variantId },
                    commandType: CommandType.StoredProcedure
                );
            }
        }

        public async Task<int> CreateAsync(CreateDiscountDto dto)
        {
            using var connection = _sqlConnectionFactory.CreateConnection();
            return await connection.ExecuteScalarAsync<int>(
                "spDiscount_Create",
                dto,
                commandType: CommandType.StoredProcedure);
        }



        public async Task UpdateAsync(UpdateDiscountDto dto)
        {
            using var connection = _sqlConnectionFactory.CreateConnection();

            await connection.ExecuteAsync(
                "spDiscount_Update",
                new
                {
                    dto.DiscountId,
                    dto.DiscountName,
                    dto.DiscountType,
                    dto.DiscountValue,
                    dto.StartDate,
                    dto.EndDate,
                    dto.IsActive,
                },
                commandType: CommandType.StoredProcedure
            );
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
