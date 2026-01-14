using EcommerceProject.Filters;
using EcommerceProject.Models.DTOs.Report;
using EcommerceProject.Repositories.Implementations;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using FluentValidation;

namespace EcommerceProject.Services.Implementations
{
    public class ReportsService : IReportsService
    {
        private readonly IReportsRepository _repository;
        private readonly IValidator<ReportFilter> _validator;
        public ReportsService(IReportsRepository repository, IValidator<ReportFilter> validator)
        {
            _repository = repository;
            _validator = validator;
        }

        private async Task ValidateAsync(ReportFilter filter)
        {
            var result = await _validator.ValidateAsync(filter);
            if (!result.IsValid)
                throw new ValidationException(result.Errors);
        }


        public async Task<IEnumerable<SalesOverviewDto>> GetSalesOverviewAsync(ReportFilter filter)
        {
            
            return await _repository.GetSalesOverviewAsync(filter);
        }

        public async Task<IEnumerable<TopProductDto>> GetTopProductsAsync(ReportFilter filter)
        {
            
            return await _repository.GetTopProductsAsync(filter);
        }

        public async Task<IEnumerable<CategorySalesDto>> GetCategorySalesAsync(ReportFilter filter)
        {
            
            return await _repository.GetCategorySalesAsync(filter);
        }

        public async Task<IEnumerable<LowStockProductDto>> GetLowStockAsync(ReportFilter filter)
        {
            
            return await _repository.GetLowStockAsync(filter);
        }


        public async Task<IEnumerable<UserRegisterOverviewDto>> GetUserRegistrationOverviewReportAsync(ReportFilter filter)
        {
            return await _repository.GetUserRegistrationOverviewAsync(filter);
        }

        public async Task<OrdersStatusReportDto> GetOrdersStatusReportAsync(ReportFilter filter)
        {
            return await _repository.GetOrdersStatusReportAsync(filter);
        }
    }
}
