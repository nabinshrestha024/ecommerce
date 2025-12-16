using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Ecommerce.Application.Common.Interfaces;
using Ecommerce.Application.Common.Models;
using Ecommerce.Application.DTOs.Order;
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
            using var connection = _context.CreateConnection();
            connection.Open();

            using var tx = connection.BeginTransaction();

            try
            {
                var orderId = await connection.ExecuteScalarAsync<int>(
                    "sales.spOrders_Create",
                    new
                    {
                        order.UserId,
                        order.OrderNumber,
                        order.Status,
                        order.SubTotal,
                        order.ShippingFee,
                        order.DiscountAmount,
                        order.TaxAmount,
                        order.TotalAmount,
                        order.BillingAddressId,
                        order.ShippingAddressId
                    },
                    transaction: tx,
                    commandType: CommandType.StoredProcedure);

                foreach (var item in order.Items)
                {
                    await connection.ExecuteScalarAsync<int>(
                        "sales.spOrderItems_Create",
                        new
                        {
                            OrderId = orderId,
                            item.ProductId,
                            item.Quantity,
                            item.UnitPrice
                        },
                        transaction: tx,
                        commandType: CommandType.StoredProcedure);
                }

                await connection.ExecuteAsync(
                    "sales.spOrderStatusHistories_Add",
                    new
                    {
                        OrderId = orderId,
                        OldStatus = (short?)null,
                        NewStatus = order.Status,
                        ChangedBy = (string?)null,
                        Notes = "Order created"
                    },
                    transaction: tx,
                    commandType: CommandType.StoredProcedure);

                tx.Commit();
                return orderId;
            }
            catch
            {
                tx.Rollback();
                throw;
            }
        }

        public async Task<Order?> GetByIdAsync(int orderId)
        {
            using var connection = _context.CreateConnection();

            using var multi = await connection.QueryMultipleAsync(
                "sales.spOrders_GetById",
                new { OrderId = orderId },
                commandType: CommandType.StoredProcedure);

            var order = await multi.ReadFirstOrDefaultAsync<Order>();
            if (order is null) return null;

            order.Items = (await multi.ReadAsync<OrderItem>()).ToList();
            order.StatusHistories = (await multi.ReadAsync<OrderStatusHistory>()).ToList();

            return order;
        }

        public async Task<PagedResult<Order>> GetPagedAsync(OrderFilterParams filter, PaginationParams pagination)
        {
            using var connection = _context.CreateConnection();

            using var multi = await connection.QueryMultipleAsync(
                "sales.spOrders_GetPaged",
                new
                {
                    pagination.Page,
                    pagination.PageSize,
                    filter.UserId,
                    filter.OrderNumber,
                    filter.Status,
                    filter.PlacedFromUtc,
                    filter.PlacedToUtc,
                    filter.MinTotal,
                    filter.MaxTotal
                },
                commandType: CommandType.StoredProcedure);

            var total = await multi.ReadFirstAsync<int>();
            var items = (await multi.ReadAsync<Order>()).ToList();

            return new PagedResult<Order>
            {
                Items = items,
                TotalCount = total,
                Page = pagination.Page,
                PageSize = pagination.PageSize
            };
        }

        public async Task<bool> UpdateStatusAsync(int orderId, short newStatus, string? changedBy, string? notes)
        {
            using var connection = _context.CreateConnection();
            connection.Open();

            using var tx = connection.BeginTransaction();

            try
            {
                var current = await connection.QueryFirstOrDefaultAsync<short?>(
                    "SELECT Status FROM sales.Orders WHERE OrderId=@OrderId",
                    new { OrderId = orderId },
                    tx);

                if (current is null) return false;

                var affected = await connection.ExecuteScalarAsync<int>(
                    "sales.spOrders_UpdateStatus",
                    new { OrderId = orderId, NewStatus = newStatus },
                    transaction: tx,
                    commandType: CommandType.StoredProcedure);

                if (affected <= 0) return false;

                await connection.ExecuteAsync(
                    "sales.spOrderStatusHistories_Add",
                    new
                    {
                        OrderId = orderId,
                        OldStatus = current,
                        NewStatus = newStatus,
                        ChangedBy = changedBy,
                        Notes = notes
                    },
                    transaction: tx,
                    commandType: CommandType.StoredProcedure);

                tx.Commit();
                return true;
            }
            catch
            {
                tx.Rollback();
                throw;
            }
        }
        public async Task<OrderSummaryDto> GetSummaryAsync()
        {
            using var connection = _context.CreateConnection();

            return await connection.QuerySingleAsync<OrderSummaryDto>(
                "sales.spOrders_GetSummary",
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<bool> CancelAsync(int orderId, string? changedBy = null, string? notes = null)
        {
            return await UpdateStatusAsync(orderId, 5, changedBy, notes ?? "Order cancelled");
        }

    }
}
