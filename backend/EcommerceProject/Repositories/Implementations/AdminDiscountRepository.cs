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
        public async Task<int> CreateAsync(CreateDiscountDto dto)
        {
            using var connection = _sqlConnectionFactory.CreateConnection();
            using var transaction = connection.BeginTransaction();
            try
            {
                var discountId = await connection.QuerySingleAsync<int>(
                "spDiscount_Create",
                new
                {
                    dto.DiscountName,
                    dto.DiscountType,
                    dto.DiscountValue,
                    dto.StartDate,
                    dto.EndDate,
                    dto.IsActive

                },
                commandType: CommandType.StoredProcedure);

                if (dto.ProductIds != null && dto.ProductIds.Any())
                {
                    foreach (var productId in dto.ProductIds)
                    {
                        await connection.ExecuteAsync(
                            @"INSERT INTO DiscountAssigns (DiscountId, ProductId)
                      VALUES (@DiscountId, @ProductId)",
                            new { DiscountId = discountId, ProductId = productId },
                            transaction
                        );
                    }
                }

                // 3️⃣ Assign to VARIANTS
                if (dto.VariantIds != null && dto.VariantIds.Any())
                {
                    foreach (var variantId in dto.VariantIds)
                    {
                        await connection.ExecuteAsync(
                            @"INSERT INTO DiscountAssigns (DiscountId, VariantId)
                      VALUES (@DiscountId, @VariantId)",
                            new { DiscountId = discountId, VariantId = variantId },
                            transaction
                        );
                    }
                }

                transaction.Commit();
                return discountId;

            }
            catch
            {
                transaction.Rollback();
                throw;
            }
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
                    ProductIds = dto.ProductIds != null ? string.Join(",", dto.ProductIds) : null,
                    VariantIds = dto.VariantIds != null ? string.Join(",", dto.VariantIds) : null
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


        public async Task<int> AddDiscountAsync(CreateDiscountDto request)
        {
            using var connection = _sqlConnectionFactory.CreateConnection();
            using var transaction = connection.BeginTransaction();


            try
            {
                var discountId = await connection.QuerySingleAsync<int>(
                    @"INSERT INTO Discounts(DiscountName,DiscountType,DiscountValue, StartDate, EndDate, IsActive)
                  VALUES (@DiscountName,@DiscountType, @DiscountValue, @StartDate, @EndDate, @IsActive);
                  SELECT CAST(SCOPE_IDENTITY() AS INT);",
                    new
                    {
                        request.DiscountName,
                        request.DiscountType,
                        request.DiscountValue,
                        request.StartDate,
                        request.EndDate,
                        request.IsActive
                    },
                    transaction:transaction
                    );


                if (request.ProductIds != null && request.ProductIds.Any())
                {
                    foreach (var productId in request.ProductIds)
                    {
                        await connection.ExecuteAsync(
                            "INSERT INTO DiscountAssigns (DiscountId, ProductId) VALUES (@DiscountId,@ProductId)",
                            new { DiscountId = discountId, ProductId = productId },
                            transaction: transaction

                        );
                    }
                }
                if (request.VariantIds != null && request.VariantIds.Any())
                {
                    foreach (var variantId in request.VariantIds)
                    {
                        await connection.ExecuteAsync(
                            @"INSERT INTO DiscountAssigns (DiscountId, VariantId) 
                      VALUES (@DiscountId, @VariantId)",
                            new { DiscountId = discountId, VariantId = variantId },
                            transaction: transaction
                        );
                    }
                }
                transaction.Commit();

                return discountId;
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
           
                    
            
        }
    }
}
