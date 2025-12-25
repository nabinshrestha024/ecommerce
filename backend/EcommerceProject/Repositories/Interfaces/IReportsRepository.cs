using EcommerceProject.Models.DTOs.Report;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IReportsRepository
    {
        Task<TotalSaleDto> GetTotalSales(DateTime from, DateTime to);
        Task<IEnumerable<OrdersByStatusDto>> GetOrdersByStatus(DateTime from, DateTime to);
        Task<IEnumerable<SalesByCategoryDto>> GetSalesByCategory(DateTime from, DateTime to);
        Task<IEnumerable<TopProductDto>> GetTopProducts(DateTime from, DateTime to, int topN);
        Task<IEnumerable<LowStockProductDto>> GetLowStockProducts(int threshold);
    }
}
