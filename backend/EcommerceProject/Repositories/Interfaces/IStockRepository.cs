using System.Collections.Generic;
using System.Threading.Tasks;
using EcommerceProject.Models.DTOs.Stock;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IStockRepository
    {
        Task<List<StockDto>> GetAllStockAsync();
        Task<List<LowStockAlertDto>> GetLowStockProductsAsync();
        Task<StockAdjustmentResultDto> AdjustStockAsync(StockAdjustmentRequestDto request, int adjustedBy);
        Task<int> GetProductStockAsync(int productId);
        Task UpdateProductStockAsync(int productId, int newStockQuantity);
    }
}