using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Application.DTOs.Order
{
    public class OrderDto
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public string OrderNumber { get; set; } = default!;
        public short Status { get; set; }
        public decimal SubTotal { get; set; }
        public decimal ShippingFee { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal TotalAmount { get; set; }
        public int? BillingAddressId { get; set; }
        public int? ShippingAddressId { get; set; }
        public DateTime PlacedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public List<OrderItemDto> Items { get; set; } = new();
        public List<OrderStatusHistoryDto> StatusHistories { get; set; } = new();
    }
}
