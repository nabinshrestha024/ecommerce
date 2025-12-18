using System.Collections.Generic;
using System.Threading.Tasks;
using EcommerceProject.Models.DTOs.Stock;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IStockRepository
    {
        Task<List<StockDto>> GetAllStockAsync();
        Task<List<LowStockAlertDto>> GetLowStockProductsAsync();
        Task<StockAdjustmentHistoryDto> AdjustStockAsync(StockAdjustmentRequestDto request, int adjustedBy);
        Task<List<StockAdjustmentHistoryDto>> GetStockAdjustmentHistoryAsync(int productId = 0, int pageNumber = 1, int pageSize = 20);
        Task<int> GetProductStockAsync(int productId);
        Task UpdateProductStockAsync(int productId, int newStockQuantity);
    }
}