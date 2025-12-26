using System.Data;
using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Models.DTOs.Payment;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Orders;
using EcommerceProject.Models.DTOs.PurchaseOrder;
using EcommerceProject.Repositories.Interfaces;

namespace EcommerceProject.Repositories.Implementations
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ISqlConnectionFactory _db;
        public OrderRepository(ISqlConnectionFactory db)
        {
            _db = db;
        }
        public async Task<(int OrderId, decimal TotalAmount)> CreateFromCartAsync(
            int userId,
            CreateOrderRequestDto dto,
            CancellationToken ct)
        {
            using var conn = _db.CreateConnection();

            var p = new DynamicParameters();
            p.Add("@UserId", userId);
            p.Add("@ShippingName", dto.ShippingName);
            p.Add("@ShippingAddress", dto.ShippingAddress);
            p.Add("@ShippingCity", dto.ShippingCity);
            p.Add("@ShippingPhone", dto.ShippingPhone);
            p.Add("@PaymentMethodId", 1);
            p.Add("@PaymentGateway", "esewa");
            p.Add("@Notes", "notes");
            p.Add("@OrderId", dbType: DbType.Int32, direction: ParameterDirection.Output);
            p.Add("@TotalAmount", dbType: DbType.Decimal, precision: 10, scale: 2, direction: ParameterDirection.Output);

            await conn.ExecuteAsync(
                "spOrders_CreateFromCart",
                p,
                commandType: CommandType.StoredProcedure
            );

            return (
                p.Get<int>("@OrderId"),
                p.Get<decimal>("@TotalAmount")
            );
        }

        public async Task<List<OrderSummaryDto>> GetMyOrdersAsync(int userId, CancellationToken ct)
        {
            using var conn = _db.CreateConnection();

            var items = await conn.QueryAsync<OrderSummaryDto>(
                "spOrders_GetMyOrders",
                new { UserId = userId },
                commandType: CommandType.StoredProcedure
            );

            return items.ToList();
        }

        public async Task<OrderDetailDto?> GetByIdForUserAsync(int userId, int orderId, CancellationToken ct)
        {
            using var conn = _db.CreateConnection();

            var header = await conn.QueryFirstOrDefaultAsync<OrderDetailDto>(
                "spOrders_GetByIdForUser_Header",
                new { UserId = userId, OrderId = orderId },
                commandType: CommandType.StoredProcedure
            );

            if (header == null) return null;

            var items = await conn.QueryAsync<OrderItemDto>(
                "spOrders_GetByIdForUser_Items",
                new { UserId = userId, OrderId = orderId },
                commandType: CommandType.StoredProcedure
            );

            header.Items = items.ToList();
            return header;
        }

        public async Task<PagedResult<AdminOrderRowDto>> AdminGetPagedAsync(
    PaginationDto pagination,
    string? status,
    string? search,
    CancellationToken ct)
        {
            using var conn = _db.CreateConnection();

            var orderDict = new Dictionary<int, AdminOrderRowDto>();

            using var multi = await conn.QueryMultipleAsync(
                "spAdminOrders_GetPaged",
                new
                {
                    Page = pagination.Page,
                    PageSize = pagination.PageSize,
                    Status = status,
                    Search = search
                },
                commandType: CommandType.StoredProcedure
            );

            multi.Read<AdminOrderRowDto, OrderItemDto, AdminOrderRowDto>(
                (order, item) =>
                {
                    if (!orderDict.TryGetValue(order.OrderId, out var existing))
                    {
                        existing = order;
                        existing.Items = new List<OrderItemDto>();
                        orderDict.Add(order.OrderId, existing);
                    }

                    if (item != null)
                        existing.Items.Add(item);

                    return existing;
                },
                splitOn: "OrderItemId"
            );

            var totalCount = await multi.ReadFirstAsync<int>();

            return new PagedResult<AdminOrderRowDto>(
                orderDict.Values.ToList(),
                pagination.Page,
                pagination.PageSize,
                totalCount
            );
        }

        public async Task<OrderDetailDto?> AdminGetByIdAsync(int orderId, CancellationToken ct)
        {
            using var conn = _db.CreateConnection();

            var header = await conn.QueryFirstOrDefaultAsync<OrderDetailDto>(
                "spAdminOrders_GetById_Header",
                new { OrderId = orderId },
                commandType: CommandType.StoredProcedure
            );

            if (header == null) return null;

            var items = await conn.QueryAsync<OrderItemDto>(
                "spAdminOrders_GetById_Items",
                new { OrderId = orderId },
                commandType: CommandType.StoredProcedure
            );

            header.Items = items.ToList();
            return header;
        }

        public async Task UpdateStatusAsync(int orderId, string newStatus, CancellationToken ct)
        {
            using var conn = _db.CreateConnection();

            await conn.ExecuteAsync(
                "spAdminOrders_UpdateStatus",
                new { OrderId = orderId, NewStatus = newStatus },
                commandType: CommandType.StoredProcedure
            );
        }

        // added for payment
        public async Task<OrderPaymentInfoDto> GetOrderForPaymentAsync(int orderId)
        {
            using var conn = _db.CreateConnection();

            return await conn.QuerySingleAsync<OrderPaymentInfoDto>(
            "spOrders_GetForPayment",
            new { OrderId = orderId },
            commandType: CommandType.StoredProcedure
        );
        }

        public async Task UpdateOrderPaymentStatus(int orderId, string paymentStatus, string orderStatus)
        {
            using var conn = _db.CreateConnection();
            await conn.ExecuteAsync(
                "spOrders_UpdateOrderPaymentStatus",
                new { OrderId = orderId, PaymentStatus = paymentStatus, OrderStatus = orderStatus },
                commandType: CommandType.StoredProcedure
            );
        }
}
}
