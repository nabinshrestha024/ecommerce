using EcommerceProject.Models.DTOs.Report;

namespace EcommerceProject.Services.Interfaces
{
    public interface IReportsService
    {
        Task<TotalSaleDto> GetTotalSalesAsync(ReportFilter filter);
        Task<IEnumerable<OrdersByStatusDto>> GetOrdersByStatusAsync(ReportFilter filter);
        Task<IEnumerable<SalesByCategoryDto>> GetSalesByCategoryAsync(ReportFilter filter);
        Task<IEnumerable<TopProductDto>> GetTopProductsAsync(ReportFilter filter);
        Task<IEnumerable<LowStockProductDto>> GetLowStockProductsAsync(ReportFilter filter);
    }
}
