using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Application.Common.Models;
using Ecommerce.Application.DTOs.Order;
using Ecommerce.Domain.Entities;

namespace Ecommerce.Application.Common.Interfaces
{
    public interface IOrderRepository
    {
        Task<int> CreateAsync(Order order);
        Task<Order?> GetByIdAsync(int orderId);
        Task<PagedResult<Order>> GetPagedAsync(OrderFilterParams filter, PaginationParams pagination);
        Task<bool> UpdateStatusAsync(int orderId, short newStatus, string? changedBy, string? notes);
        Task<OrderSummaryDto> GetSummaryAsync();
        Task<bool> CancelAsync(int orderId, string? changedBy = null, string? notes = null);

    }
}
