using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Application.DTOs.Order
{
    public class OrderDto
    {
        public int OrderID { get; set; }
        public string? OrderNumber { get; set; }
        public decimal Total { get; set; }
        public int PaymentStatus { get; set; }
        public int FulfillmentStatus { get; set; }
        public DateTime PlacedAt { get; set; }
        public string ShippingAddress { get; set; } = null!;
    }
}
