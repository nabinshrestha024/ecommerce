using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Domain.Entities
{
    public class Order
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public string OrderNumber { get; set; } = default!;
        public short Status { get; set; } // OrderStatus enum underlying short

        public decimal SubTotal { get; set; }
        public decimal ShippingFee { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal TotalAmount { get; set; }

        public int? BillingAddressId { get; set; }
        public int? ShippingAddressId { get; set; }

        public DateTime PlacedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public List<OrderItem> Items { get; set; } = new();
        public List<OrderStatusHistory> StatusHistories { get; set; } = new();
    }
}
