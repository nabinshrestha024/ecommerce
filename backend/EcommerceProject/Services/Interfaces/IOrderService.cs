using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Orders;

namespace EcommerceProject.Services.Interfaces
{
    public interface IOrderService
    {
        Task<(int OrderId, decimal TotalAmount)> CreateOrderFromCartAsync(
            int userId,
            CreateOrderRequestDto dto,
            CancellationToken ct);

        Task<List<OrderSummaryDto>> GetMyOrdersAsync(int userId, CancellationToken ct);
        Task CancelOrderAsync(int userId, int orderId, CancellationToken ct);

        Task<OrderDetailDto?> GetMyOrderByIdAsync(int userId, int orderId, CancellationToken ct);

        Task<PagedResult<AdminOrderRowDto>> AdminGetOrdersAsync(
            PaginationDto pagination,
            string? status,
            string? search,
            CancellationToken ct);

        Task<OrderDetailDto?> AdminGetOrderByIdAsync(int orderId, CancellationToken ct);

        Task AdminUpdateStatusAsync(int orderId, string status, CancellationToken ct);
    }
}
