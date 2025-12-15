using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Ecommerce.Application.Common.Interfaces;
using Ecommerce.Domain.Entities;
using Ecommerce.Persistence.Context;

namespace Ecommerce.Persistence.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DapperContext _context;

        public OrderRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<int> CreateAsync(Order order)
        {
            using var conn = _context.CreateConnection();
            return await conn.ExecuteScalarAsync<int>(
                "catalog.sp_Orders_Create",
                order,
                commandType: CommandType.StoredProcedure);
        }

        public async Task<Order?> GetByIdAsync(int orderId)
        {
            using var conn = _context.CreateConnection();
            return await conn.QueryFirstOrDefaultAsync<Order>(
                "catalog.sp_Orders_GetById",
                new { OrderId = orderId },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<Order>> GetAllAsync()
        {
            using var conn = _context.CreateConnection();
            return await conn.QueryAsync<Order>(
                "catalog.sp_Orders_GetAll",
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> UpdateStatusAsync(int orderId, int paymentStatus, int fulfillmentStatus)
        {
            using var conn = _context.CreateConnection();
            return await conn.ExecuteAsync(
                "catalog.sp_Orders_UpdateStatus",
                new { orderId, paymentStatus, fulfillmentStatus },
                commandType: CommandType.StoredProcedure) > 0;
        }

        public async Task<bool> CancelAsync(int orderId)
        {
            using var conn = _context.CreateConnection();
            return await conn.ExecuteAsync(
                "catalog.sp_Orders_Cancel",
                new { orderId },
                commandType: CommandType.StoredProcedure) > 0;
        }
    }
}
