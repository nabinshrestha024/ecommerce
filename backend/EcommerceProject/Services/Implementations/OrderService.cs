using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Orders;
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
        public OrderService(IOrderRepository repo) => _repo = repo;

        public async Task<(int OrderId, decimal TotalAmount)> CreateOrderFromCartAsync(int userId, CreateOrderRequestDto dto, CancellationToken ct)
        {
            await new CreateOrderRequestValidator().ValidateAndThrowAsync(dto, ct);
            return await _repo.CreateFromCartAsync(userId, dto, ct);
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
