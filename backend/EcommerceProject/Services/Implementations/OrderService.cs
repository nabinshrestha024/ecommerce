using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Orders;
using EcommerceProject.Models.DTOs.Stock;
using EcommerceProject.Models.Entities;
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
        private readonly IUrlService _urlService;
        public OrderService(IOrderRepository repo, INotificationService notification, IStockService stockService, IUrlService urlService)
        {
            _repo = repo;
            _notification = notification;
            _stockService = stockService;
            _urlService = urlService;
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
                        VariantId = item.VariantId,
                        AdjustmentQuantity = item.Quantity,
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

        public async Task<List<OrderSummaryDto>> GetMyOrdersAsync(int userId, CancellationToken ct)
        {
           var order = await _repo.GetMyOrdersAsync(userId, ct);
            return order;
        }

        public async Task<OrderDetailDto?> GetMyOrderByIdAsync(int userId, int orderId, CancellationToken ct)
        {
            var order = await _repo.GetByIdForUserAsync(userId, orderId, ct);
            if (order == null)
                return null;

            if (order.Items != null)
            {
                foreach (var item in order.Items)
                {
                    item.ProductImageUrl = _urlService.ToAbsoluteUrl(item.ProductImageUrl);
                }
            }

            return order;
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


        public async Task<PagedResult<AdminOrderRowDto>> AdminGetOrdersAsync(PaginationDto pagination, string? status, string? search,CancellationToken ct)
        {
            var result = await _repo.AdminGetPagedAsync(pagination, status, search, ct);

            if (result?.Items != null)
            {
                foreach (var order in result.Items)
                {
                    if (order.Items != null)
                    {
                        foreach (var item in order.Items)
                        {
                            item.ProductImageUrl =
                                _urlService.ToAbsoluteUrl(item.ProductImageUrl);
                        }
                    }
                }
            }

            return result;
        }

        public async Task<OrderDetailDto?> AdminGetOrderByIdAsync(int orderId, CancellationToken ct)
        {
            var order = await _repo.AdminGetByIdAsync(orderId, ct);
            if (order == null)
                return null;
            if (order.Items != null)
            {
                foreach (var item in order.Items)
                {
                    item.ProductImageUrl = _urlService.ToAbsoluteUrl(item.ProductImageUrl);
                }
            }

            return order;
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
