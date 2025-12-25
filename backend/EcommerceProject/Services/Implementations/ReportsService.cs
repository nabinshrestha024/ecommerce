using EcommerceProject.Models.DTOs.Report;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;

namespace EcommerceProject.Services.Implementations
{
    public class ReportsService : IReportsService
    {
        private readonly IReportsRepository _repository;

        public ReportsService(IReportsRepository repository)
        {
            _repository = repository;
        }

        public Task<TotalSaleDto> GetTotalSalesAsync(ReportFilter filter)
        {
            return _repository.GetTotalSales(filter.FromDate, filter.ToDate);
        }

        public Task<IEnumerable<OrdersByStatusDto>> GetOrdersByStatusAsync(ReportFilter filter)
        {
            return _repository.GetOrdersByStatus(filter.FromDate, filter.ToDate);
        }

        public Task<IEnumerable<SalesByCategoryDto>> GetSalesByCategoryAsync(ReportFilter filter)
        {
            return _repository.GetSalesByCategory(filter.FromDate, filter.ToDate);
        }

        public Task<IEnumerable<TopProductDto>> GetTopProductsAsync(ReportFilter filter)
        {
            return _repository.GetTopProducts(filter.FromDate, filter.ToDate, filter.TopN.Value);
        }

        public Task<IEnumerable<LowStockProductDto>> GetLowStockProductsAsync(ReportFilter filter)
        {
            return _repository.GetLowStockProducts(filter.Threshold.Value);
        }
    }
}
