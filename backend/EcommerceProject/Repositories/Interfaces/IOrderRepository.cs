using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Orders;
using EcommerceProject.Models.DTOs.Payment;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IOrderRepository
    {
        Task<(int OrderId, decimal TotalAmount)> CreateFromCartAsync(int userId,CreateOrderRequestDto dto,CancellationToken ct);
        Task<List<OrderSummaryDto>> GetMyOrdersAsync(int userId, CancellationToken ct);
        Task<OrderDetailDto?> GetByIdForUserAsync(int userId, int orderId, CancellationToken ct);
        Task<PagedResult<AdminOrderRowDto>> AdminGetPagedAsync(PaginationDto pagination,string? status,string? search,CancellationToken ct);
        Task<OrderDetailDto?> AdminGetByIdAsync(int orderId, CancellationToken ct);
        Task UpdateStatusAsync(int orderId, string newStatus, CancellationToken ct);
        
        // added for payment
        Task<OrderPaymentInfoDto> GetOrderForPaymentAsync(int orderId);
        Task UpdateOrderPaymentStatus(int orderId, string paymentStatus, string orderStatus);    
    }
}
