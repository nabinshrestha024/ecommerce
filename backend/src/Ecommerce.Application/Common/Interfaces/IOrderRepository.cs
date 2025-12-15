using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Domain.Entities;

namespace Ecommerce.Application.Common.Interfaces
{
    public interface IOrderRepository
    {
        Task<int> CreateAsync(Order order);
        Task<Order?> GetByIdAsync(int orderId);
        Task<IEnumerable<Order>> GetAllAsync();
        Task<bool> UpdateStatusAsync(int orderId, int paymentStatus, int fulfillmentStatus);
        Task<bool> CancelAsync(int orderId);
    }
}
