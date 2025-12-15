using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Application.DTOs.Order
{
    public class CreateOrderDto
    {
        public int UserId { get; set; }
        public string ShippingAddress { get; set; } = null!;
        public string BillingAddress { get; set; } = null!;
        public decimal SubTotal { get; set; }
        public decimal ShippingCost { get; set; }
        public decimal Tax { get; set; }
        public string PaymentMethod { get; set; } = null!; 
        public string? Notes { get; set; }
    }
}
