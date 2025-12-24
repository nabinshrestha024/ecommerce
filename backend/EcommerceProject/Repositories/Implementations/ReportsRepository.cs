using Dapper;
using EcommerceProject.Database;
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

        public async Task<TotalSaleDto> GetTotalSales(DateTime from, DateTime to)
        {
            using var conn = _connectionFactory.CreateConnection();
            return await conn.QueryFirstOrDefaultAsync<TotalSaleDto>(
                "spReport_GetTotalSales",
                new { FromDate = from, ToDate = to },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<OrdersByStatusDto>> GetOrdersByStatus(DateTime from, DateTime to)
        {
            using var conn = _connectionFactory.CreateConnection();
            return await conn.QueryAsync<OrdersByStatusDto>(
                "spReport_GetOrdersByStatus",
                new { FromDate = from, ToDate = to },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<SalesByCategoryDto>> GetSalesByCategory(DateTime from, DateTime to)
        {
            using var conn = _connectionFactory.CreateConnection();
            return await conn.QueryAsync<SalesByCategoryDto>(
                "spReport_GetSalesByCategory",
                new { FromDate = from, ToDate = to },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<TopProductDto>> GetTopProducts(DateTime from, DateTime to, int topN)
        {
            using var conn = _connectionFactory.CreateConnection();
            return await conn.QueryAsync<TopProductDto>(
                "spReport_GetTopProducts",
                new { FromDate = from, ToDate = to, TopN = topN },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<IEnumerable<LowStockProductDto>> GetLowStockProducts(int threshold)
        {
            using var conn = _connectionFactory.CreateConnection();
            return await conn.QueryAsync<LowStockProductDto>(
                "spReport_GetLowStockProducts",
                new { Threshold = threshold },
                commandType: CommandType.StoredProcedure
            );
        }
    }
}
