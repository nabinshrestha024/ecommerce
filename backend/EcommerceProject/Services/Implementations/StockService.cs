using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EcommerceProject.Models.DTOs.Stock;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using Microsoft.Extensions.Logging;

namespace EcommerceProject.Services.Implementations
{
    public class StockService : IStockService   
    {
        private readonly IStockRepository _stockRepository;
        private readonly ILogger<StockService> _logger;

        public StockService(IStockRepository stockRepository, ILogger<StockService> logger)
        {
            _stockRepository = stockRepository;
            _logger = logger;
        }

        public async Task<List<StockDto>> GetAllStockAsync()
        {
            try
            {
                _logger.LogInformation("Getting all stock");
                return await _stockRepository.GetAllStockAsync();
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
                _logger.LogInformation("Getting low stock alerts");
                return await _stockRepository.GetLowStockProductsAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting low stock products");
                throw;
            }
        }

        public async Task<StockAdjustmentRequestDto> AdjustStockAsync(StockAdjustmentRequestDto request, int adjustedBy)
        {
            try
            {
                _logger.LogInformation("Adjusting stock for product {ProductId}: Adjustment={AdjustmentQuantity}", 
                    request.ProductId, request.AdjustmentQuantity);
                
                if (request.AdjustmentQuantity == 0)
                {
                    throw new ArgumentException("Adjustment quantity cannot be zero");
                }
                
                var adjustment = await _stockRepository.AdjustStockAsync(request, adjustedBy);
                _logger.LogInformation("Stock adjusted successfully for product {ProductId}", request.ProductId);
                
                return request;
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
                _logger.LogInformation("Getting stock for product {ProductId}", productId);
                return await _stockRepository.GetProductStockAsync(productId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting product stock for product {ProductId}", productId);
                throw;
            }
        }
    }
}