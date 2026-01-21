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
        public async Task<(int OrderId, decimal TotalAmount, List<(int productId,int VariantId, int Quantity)>)> CreateFromCartAsync(int userId, CreateOrderRequestDto dto, CancellationToken ct)
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
            p.Add("@TotalAmount", dbType: DbType.Decimal, precision: 18, scale: 2, direction: ParameterDirection.Output);

            using var multi = await conn.QueryMultipleAsync(
                "spOrders_CreateFromCart",
                p,
                commandType: CommandType.StoredProcedure);

            var items = multi.Read<(int productId,int VariantId, int Quantity)>().AsList();
            return (
                p.Get<int>("@OrderId"),
                p.Get<decimal>("@TotalAmount"),
                items);
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

            using var multi = await conn.QueryMultipleAsync(
                "spOrders_GetByIdForUser_Items",
                new { UserId = userId, OrderId = orderId },
                commandType: CommandType.StoredProcedure
            );

            var items = (await multi.ReadAsync<OrderItemDto>()).ToList();
            var allAttributes = (await multi.ReadAsync<dynamic>()).ToList();

            foreach (var item in items)
            {
                item.Variant = allAttributes
                    .Where(a => (int)a.OrderItemId == item.OrderItemId)
                    .Select(a => new OrderItemVariantAttributeDto
                    {
                        Name = (string)a.Name,
                        Value = (string)a.Value
                    })
                    .ToList();
            }

            header.Items = items;
            return header;
        }

        //public async Task<PagedResult<AdminOrderRowDto>> AdminGetPagedAsync(
        //    PaginationDto pagination,
        //    string? status,
        //    string? search,
        //    CancellationToken ct)
        //{
        //    using var conn = _db.CreateConnection();
        //    var orderDict = new Dictionary<int, AdminOrderRowDto>();

        //    using var multi = await conn.QueryMultipleAsync(
        //        "spAdminOrders_GetPaged",
        //        new {
        //            Page = pagination.Page,
        //            PageSize = pagination.PageSize,
        //            Status = status,
        //            Search = search
        //        },
        //        commandType: CommandType.StoredProcedure
        //    );

        //    multi.Read<AdminOrderRowDto, OrderItemDto, AdminOrderRowDto>(
        //        (order, item) => {
        //            if (!orderDict.TryGetValue(order.OrderId, out var existing)) {
        //                existing = order;
        //                existing.Items = new List<OrderItemDto>();
        //                orderDict.Add(order.OrderId, existing);
        //            }
        //            if (item != null) existing.Items.Add(item);
        //            return existing;
        //        },
        //        splitOn: "OrderItemId"
        //    );

        //    var totalCount = await multi.ReadFirstAsync<int>();

        //    using (var multis = await conn.QueryMultipleAsync("spAdminOrders_GetPaged", commandType: CommandType.StoredProcedure))
        //    {
        //        var allAttributes = (await multi.ReadAsync<dynamic>()).ToList();

        //        foreach (var order in orderDict.Values)
        //        {
        //            foreach (var item in order.Items)
        //            {
        //                item.Variant = allAttributes
        //                    .Where(a => (int)a.OrderItemId == item.OrderItemId)
        //                    .Select(a => new OrderItemVariantAttributeDto
        //                    {
        //                        Name = (string)a.Name,
        //                        Value = (string)a.Value
        //                    })
        //                    .ToList();
        //            }
        //        }
        //    }
        //    return new PagedResult<AdminOrderRowDto>(
        //        orderDict.Values.ToList(),
        //        pagination.Page,
        //        pagination.PageSize,
        //        totalCount
        //    );
        //}
        public async Task<PagedResult<AdminOrderRowDto>> AdminGetPagedAsync(
    PaginationDto pagination,
    string? status,
    string? search,
    CancellationToken ct)
        {
            using var conn = _db.CreateConnection();
            var orderDict = new Dictionary<int, AdminOrderRowDto>();

            // 1️⃣ Get Orders + Items + TotalCount
            using (var multi = await conn.QueryMultipleAsync(
                "spAdminOrders_GetPaged",
                new
                {
                    Page = pagination.Page,
                    PageSize = pagination.PageSize,
                    Status = status,
                    Search = search
                },
                commandType: CommandType.StoredProcedure))
            {
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

                // 2️⃣ Fetch attributes using normal query
                var orderItemIds = orderDict.Values
                    .SelectMany(o => o.Items)
                    .Select(i => i.OrderItemId)
                    .Distinct()
                    .ToList();

                List<OrderItemVariantAttributeDto> allAttributes = new();

                if (orderItemIds.Any())
                {
                    const string sql = @"
                SELECT
                    OrderId,
                    Name,
                    Value
                FROM OrderItem
                WHERE OrderItemId IN @Ids";

                    allAttributes = (await conn.QueryAsync<OrderItemVariantAttributeDto>(
                        sql,
                        new { Ids = orderItemIds }
                    )).ToList();
                }

                // 3️⃣ Map attributes
                var lookup = allAttributes
                    .GroupBy(a => a.OrderItemId)
                    .ToDictionary(g => g.Key, g => g.ToList());

                foreach (var order in orderDict.Values)
                {
                    foreach (var item in order.Items)
                    {
                        item.Variant = lookup.TryGetValue(item.OrderItemId, out var attrs)
                            ? attrs
                            : new List<OrderItemVariantAttributeDto>();
                    }
                }

                return new PagedResult<AdminOrderRowDto>(
                    orderDict.Values.ToList(),
                    pagination.Page,
                    pagination.PageSize,
                    totalCount
                );
            }
        }

        public async Task<OrderDetailDto?> AdminGetByIdAsync(int orderId, CancellationToken ct)
        {
            using var conn = _db.CreateConnection();

            using var multi = await conn.QueryMultipleAsync(
                "spAdminOrders_GetById",
                new { OrderId = orderId },
                commandType: CommandType.StoredProcedure
            );

            var order = await multi.ReadFirstOrDefaultAsync<OrderDetailDto>();
            if (order == null) return null;

            var items = (await multi.ReadAsync<OrderItemDto>()).ToList();
            
            var allAttributes = (await multi.ReadAsync<dynamic>()).ToList();

            foreach (var item in items)
            {
                item.Variant = allAttributes
                    .Where(a => (int)a.OrderItemId == item.OrderItemId)
                    .Select(a => new OrderItemVariantAttributeDto
                    {
                        Name = (string)a.Name,
                        Value = (string)a.Value
                    })
                    .ToList();
            }

            order.Items = items;
            return order;
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
