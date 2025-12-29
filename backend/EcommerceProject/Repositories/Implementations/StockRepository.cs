using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.Stock;
using EcommerceProject.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace EcommerceProject.Repositories.Implementations
{
    public class StockRepository : IStockRepository
    {
        private readonly SqlConnectionFactory _connectionFactory;
        private readonly ILogger<StockRepository> _logger;

        public StockRepository(IConfiguration configuration, ILogger<StockRepository> logger)
        {
            _connectionFactory = new SqlConnectionFactory(configuration);
            _logger = logger;
        }

        public async Task<List<StockDto>> GetAllStockAsync()
        {
            try
            {
                using var connection = _connectionFactory.CreateConnection();
                var stock = await connection.QueryAsync<StockDto>(
                    "spStock_GetAll",
                    commandType: CommandType.StoredProcedure
                );
                return stock.AsList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all stock");
                throw;
            }
        }

        public async Task<List<LowStockAlertDto>> GetLowStockProductsAsync()
        {
            try
            {
                using var connection = _connectionFactory.CreateConnection();
                var lowStockProducts = await connection.QueryAsync<LowStockAlertDto>(
                    "spStock_GetLowStock",
                    commandType: CommandType.StoredProcedure
                );
                return lowStockProducts.AsList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting low stock products");
                throw;
            }
        }

        public async Task<StockAdjustmentResultDto?> AdjustStockAsync(StockAdjustmentRequestDto request, int adjustedBy)
        {
            try
            {
                using var connection = _connectionFactory.CreateConnection();
                
                var adjustment = await connection.QuerySingleOrDefaultAsync<StockAdjustmentResultDto>(
                    "spStock_Adjust",
                    new
                    {
                        ProductId = request.ProductId,
                        AdjustmentQuantity = request.AdjustmentQuantity,
                        request.Reason,
                        request.Notes,
                        AdjustedBy = adjustedBy
                    },
                    commandType: CommandType.StoredProcedure
                );
                
                return adjustment;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adjusting stock for product {ProductId}", request.ProductId);
                throw;
            }
        }

        public async Task<int> GetProductStockAsync(int productId)
        {
            try
            {
                using var connection = _connectionFactory.CreateConnection();
                var stock = await connection.QuerySingleOrDefaultAsync<int>(
                    "SELECT StockQuantity FROM Products WHERE ProductID = @ProductId AND IsActive = 1",
                    new { ProductId = productId }
                );
                
                return stock;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting product stock for product {ProductId}", productId);
                throw;
            }
        }
        public async Task DecreaseStockOnOrderAsync(int productId, int quantity, IDbTransaction tx)
        {
            await tx.Connection.ExecuteAsync(
                "spStock_Decrease_OnOrder",
                new { ProductId = productId, Quantity = quantity },
                transaction: tx,
                commandType: CommandType.StoredProcedure
            );
        }
    }
}