using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Filters;
using EcommerceProject.Models.DTOs.Report;
using EcommerceProject.Repositories.Interfaces;
using Microsoft.Data.SqlClient;
using System.Data;

namespace EcommerceProject.Repositories.Implementations
{
    public class ReportsRepository : IReportsRepository
    {
        private readonly ISqlConnectionFactory _connectionFactory;

        public ReportsRepository(ISqlConnectionFactory sqlConnectionFactory)
        {
            _connectionFactory = sqlConnectionFactory;
        }

        public async Task<IEnumerable<SalesOverviewDto>> GetSalesOverviewAsync(ReportFilter filter)
        {
            using var connection = _connectionFactory.CreateConnection();
            var parameters = new DynamicParameters();
            parameters.Add("@FromDate", filter.FromDate);
            parameters.Add("@ToDate", filter.ToDate);
            parameters.Add("@Period", filter.Period?.ToString().ToLower());
            parameters.Add("@sortOrder", filter.sortOrder);

            return await connection.QueryAsync<SalesOverviewDto>
                ("spReport_GetTotalSales", 
                parameters,
                commandType: CommandType.StoredProcedure
                );
        }

        public async Task<IEnumerable<TopProductDto>> GetTopProductsAsync(ReportFilter filter)
        {
            using var connection = _connectionFactory.CreateConnection();
            var parameters = new DynamicParameters();
            parameters.Add("@FromDate", filter.FromDate);
            parameters.Add("@ToDate", filter.ToDate);
            parameters.Add("@Period", filter.Period?.ToString().ToLower());
            parameters.Add("@sortOrder", filter.sortOrder);

            return await connection.QueryAsync<TopProductDto>
                ("spReport_GetTopProducts",
                parameters,
                commandType: CommandType.StoredProcedure
                );
        }

        public async Task<IEnumerable<CategorySalesDto>> GetCategorySalesAsync(ReportFilter filter)
        {
            using var connection = _connectionFactory.CreateConnection();
            var parameters = new DynamicParameters();
            parameters.Add("@FromDate", filter.FromDate);
            parameters.Add("@ToDate", filter.ToDate);
            parameters.Add("@Period", filter.Period?.ToString().ToLower());
            parameters.Add("@sortOrder", filter.sortOrder);

            return await connection.QueryAsync<CategorySalesDto>
                ("spReport_GetSalesByCategory",
                parameters, commandType: CommandType.StoredProcedure
                );
        }
        public async Task<IEnumerable<LowStockProductDto>> GetLowStockAsync(ReportFilter filter)
        {
            using var connection = _connectionFactory.CreateConnection();

            var parameters = new DynamicParameters();
            parameters.Add("@FromDate", filter.FromDate);
            parameters.Add("@ToDate", filter.ToDate);
            parameters.Add("@Period", filter.Period?.ToString().ToLower());
            parameters.Add("@sortOrder", filter.sortOrder);

            return await connection.QueryAsync<LowStockProductDto>
                ("spReport_GetLowStockProducts",
                parameters,
                commandType: CommandType.StoredProcedure
                );
        }

        public async Task<IEnumerable<UserRegisterOverviewDto>> GetUserRegistrationOverviewAsync(ReportFilter filter)
        {
            using var connection = _connectionFactory.CreateConnection();

            var parameters = new DynamicParameters();
            parameters.Add("@FromDate", filter.FromDate);
            parameters.Add("@ToDate", filter.ToDate);
            parameters.Add("@Period", filter.Period?.ToString().ToLower());
            parameters.Add("@sortOrder", filter.sortOrder);

            return await connection.QueryAsync<UserRegisterOverviewDto>(
                "spReport_GetUserRegistrationOverview",
                parameters,
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<OrdersStatusReportDto?> GetOrdersStatusReportAsync(ReportFilter filter)
        {
            var parameters = new { 
                StartDate = filter.FromDate, 
                EndDate = filter.ToDate 
            };

            using (var connection = _connectionFactory.CreateConnection())
            {
                return await connection.QueryFirstOrDefaultAsync<OrdersStatusReportDto>(
                    "sp_GetOrdersStatusReport", 
                    parameters, 
                    commandType: CommandType.StoredProcedure);
            }
        }

    }
}
