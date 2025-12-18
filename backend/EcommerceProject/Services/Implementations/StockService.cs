using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.Stock;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace EcommerceProject.Services.Implementations
{
    public class StockService : IStockService
    {
        private readonly SqlConnectionFactory _connectionFactory;
        private readonly ILogger<StockService> _logger;

        public StockService(IConfiguration configuration, ILogger<StockService> logger)
        {
            _connectionFactory = new SqlConnectionFactory(configuration);
            _logger = logger;
        }

        public async Task<List<StockDto>> GetAllStockAsync()
        {
            const string query = @"
                SELECT 
                    p.ProductID AS ProductId,
                    p.Name AS ProductName,
                    p.SKU,
                    p.StockQuantity AS CurrentStock,
                    10 AS ReorderLevel, -- Default reorder level
                    p.Price,
                    c.Name AS CategoryName,
                    p.UpdatedAt AS LastUpdated
                FROM Products p
                LEFT JOIN Categories c ON p.CategoryID = c.CategoryID
                WHERE p.IsActive = 1
                ORDER BY p.Name";

            try
            {
                using var connection = _connectionFactory.CreateConnection();
                var stock = await connection.QueryAsync<StockDto>(query);
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
            const string query = @"
                SELECT 
                    p.ProductID AS ProductId,
                    p.Name AS ProductName,
                    p.SKU,
                    p.StockQuantity AS CurrentStock,
                    10 AS ReorderLevel, -- Default reorder level
                    c.Name AS CategoryName,
                    (SELECT MAX(OrderDate) FROM OrderItems oi 
                     INNER JOIN Orders o ON oi.OrderID = o.OrderID 
                     WHERE oi.ProductID = p.ProductID) AS LastSoldDate
                FROM Products p
                LEFT JOIN Categories c ON p.CategoryID = c.CategoryID
                WHERE p.IsActive = 1 
                    AND p.StockQuantity <= 10 -- Low stock threshold
                ORDER BY p.StockQuantity ASC";

            try
            {
                using var connection = _connectionFactory.CreateConnection();
                var lowStockProducts = await connection.QueryAsync<LowStockAlertDto>(query);
                return lowStockProducts.AsList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting low stock products");
                throw;
            }
        }

        public async Task<StockAdjustmentHistoryDto> AdjustStockAsync(StockAdjustmentRequestDto request, int adjustedBy)
        {
            using var connection = _connectionFactory.CreateConnection();
            connection.Open();
            using var transaction = connection.BeginTransaction();

            try
            {
                // Get current stock
                const string getCurrentStockQuery = @"
                    SELECT StockQuantity 
                    FROM Products 
                    WHERE ProductID = @ProductId";

                var currentStock = await connection.QuerySingleOrDefaultAsync<int>(
                    getCurrentStockQuery, 
                    new { request.ProductId }, 
                    transaction);

                // Calculate new stock
                var newStock = currentStock + request.AdjustmentQuantity;
                if (newStock < 0)
                {
                    throw new InvalidOperationException($"Stock cannot be negative. Current: {currentStock}, Adjustment: {request.AdjustmentQuantity}");
                }

                // Update product stock
                const string updateStockQuery = @"
                    UPDATE Products 
                    SET StockQuantity = @NewStock, 
                        UpdatedAt = GETDATE() 
                    WHERE ProductID = @ProductId";

                await connection.ExecuteAsync(
                    updateStockQuery, 
                    new { request.ProductId, NewStock = newStock }, 
                    transaction);

                // For now, return a simple DTO without saving to history table
                var adjustmentHistory = new StockAdjustmentHistoryDto
                {
                    ProductId = request.ProductId,
                    ProductName = await GetProductNameAsync(connection, request.ProductId, transaction),
                    AdjustmentQuantity = request.AdjustmentQuantity,
                    NewStockLevel = newStock,
                    Reason = request.Reason,
                    Notes = request.Notes,
                    AdjustedBy = adjustedBy,
                    AdjustedByName = await GetUserNameAsync(connection, adjustedBy, transaction),
                    AdjustedAt = DateTime.UtcNow
                };

                transaction.Commit();
                _logger.LogInformation("Stock adjusted for product {ProductId}: {Adjustment}", request.ProductId, request.AdjustmentQuantity);
                
                return adjustmentHistory;
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                _logger.LogError(ex, "Error adjusting stock for product {ProductId}", request.ProductId);
                throw;
            }
        }

        public async Task<int> GetProductStockAsync(int productId)
        {
            const string query = @"
                SELECT StockQuantity 
                FROM Products 
                WHERE ProductID = @ProductId";

            try
            {
                using var connection = _connectionFactory.CreateConnection();
                return await connection.QuerySingleOrDefaultAsync<int>(query, new { ProductId = productId });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting product stock for product {ProductId}", productId);
                throw;
            }
        }

        private async Task<string?> GetProductNameAsync(IDbConnection connection, int productId, IDbTransaction? transaction = null)
        {
            const string query = "SELECT Name FROM Products WHERE ProductID = @ProductId";
            return await connection.QuerySingleOrDefaultAsync<string>(
                query, new { ProductId = productId }, transaction);
        }

        private async Task<string?> GetUserNameAsync(IDbConnection connection, int userId, IDbTransaction? transaction = null)
        {
            const string query = "SELECT FullName FROM Users WHERE UserID = @UserId";
            return await connection.QuerySingleOrDefaultAsync<string>(
                query, new { UserId = userId }, transaction);
        }
    }
}