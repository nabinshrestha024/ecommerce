using EcommerceProject.Filters;
using EcommerceProject.Models.DTOs.Report;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IReportsRepository
    {
        Task<IEnumerable<SalesOverviewDto>> GetSalesOverviewAsync(ReportFilter filter);
        Task<IEnumerable<TopProductDto>> GetTopProductsAsync(ReportFilter filter);
        Task<IEnumerable<CategorySalesDto>> GetCategorySalesAsync(ReportFilter filter);
        Task<IEnumerable<LowStockProductDto>> GetLowStockAsync(ReportFilter filter);
        Task<IEnumerable<UserRegisterOverviewDto>> GetUserRegistrationOverviewAsync(ReportFilter filter);
    }
}
