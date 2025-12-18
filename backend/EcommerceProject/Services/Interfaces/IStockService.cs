using System.Collections.Generic;
using System.Threading.Tasks;
using EcommerceProject.Models.DTOs.Stock;

namespace EcommerceProject.Services.Interfaces
{
    public interface IStockService
    {
        Task<List<StockDto>> GetAllStockAsync();
        Task<List<LowStockAlertDto>> GetLowStockProductsAsync();
        Task<StockAdjustmentHistoryDto> AdjustStockAsync(StockAdjustmentRequestDto request, int adjustedBy);
        Task<int> GetProductStockAsync(int productId);
    }
}