using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Orders;
using EcommerceProject.Models.DTOs.Stock;
using EcommerceProject.Models.Validators.Order;
using EcommerceProject.Models.Validators.Product;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using FluentValidation;

namespace EcommerceProject.Services.Implementations
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _repo;
        private readonly INotificationService _notification;
        private readonly IStockService _stockService;
        public OrderService(IOrderRepository repo, INotificationService notification, IStockService stockService)
        {
            _repo = repo;
            _notification = notification;
            _stockService = stockService;    
        }
        public async Task<(int OrderId, decimal TotalAmount)> CreateOrderFromCartAsync(int userId, CreateOrderRequestDto dto, CancellationToken ct)
        {
            await new CreateOrderRequestValidator().ValidateAsync(dto, ct);
            var (orderId, totalAmount, items) = await _repo.CreateFromCartAsync(userId, dto, ct);

            foreach (var item in items)
            {
                await _stockService.AdjustStockAsync(
                    new StockAdjustmentRequestDto
                    {
                        ProductId = item.ProductId,
                        AdjustmentQuantity = -item.Quantity,
                        Reason = "Order Placed",
                        Notes = $"Order #{orderId}"
                    },
                    userId
                );
            }
            await _notification.NotifyUserAsync(
                userId,
                "Order Placed",
                $"Your order #{orderId} has been placed successfully.",
                orderId,
                sendEmail: true,
                ct);

            await _notification.NotifyAdminsAsync(
                "New Order",
                $"New order placed: #{orderId}",
                orderId,
                ct);

            return (orderId, totalAmount);
        }

        public Task<List<OrderSummaryDto>> GetMyOrdersAsync(int userId, CancellationToken ct)
        {
            return _repo.GetMyOrdersAsync(userId, ct);
        }

        public Task<OrderDetailDto?> GetMyOrderByIdAsync(int userId, int orderId, CancellationToken ct)
        {
            return _repo.GetByIdForUserAsync(userId, orderId, ct);
        }
        public async Task CancelOrderAsync(int userId,int orderId, CancellationToken ct)
        {
            var order = await _repo.GetByIdForUserAsync(userId, orderId, ct);

            if (order == null)
                throw new InvalidOperationException("Order not found.");

            if (order.Status != "Pending")
                throw new InvalidOperationException(
                    "Only pending orders can be cancelled.");

            await _repo.UpdateStatusAsync(orderId, "Cancelled", ct);
        }


        public Task<PagedResult<AdminOrderRowDto>> AdminGetOrdersAsync(PaginationDto pagination, string? status, string? search,CancellationToken ct)
        {
            return _repo.AdminGetPagedAsync(pagination, status, search, ct);
        }

        public Task<OrderDetailDto?> AdminGetOrderByIdAsync(int orderId, CancellationToken ct)
        {
            return _repo.AdminGetByIdAsync(orderId, ct);
        }
           

        public async Task AdminUpdateStatusAsync(int orderId, string status, CancellationToken ct)
        {
            var dto = new UpdateOrderStatusDto
            {
                Status = status
            };
            await new UpdateOrderStatusValidator().ValidateAndThrowAsync(dto, ct);


            await _repo.UpdateStatusAsync(orderId, status, ct);
        }
    }
}
