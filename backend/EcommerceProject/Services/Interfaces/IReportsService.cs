using EcommerceProject.Filters;
using EcommerceProject.Models.DTOs.Report;

namespace EcommerceProject.Services.Interfaces
{
    public interface IReportsService
    {
        Task<IEnumerable<SalesOverviewDto>> GetSalesOverviewAsync(ReportFilter filter);
        Task<IEnumerable<TopProductDto>> GetTopProductsAsync(ReportFilter filter);
        Task<IEnumerable<CategorySalesDto>> GetCategorySalesAsync(ReportFilter filter);
        Task<IEnumerable<LowStockProductDto>> GetLowStockAsync(ReportFilter filter);
    }
}
