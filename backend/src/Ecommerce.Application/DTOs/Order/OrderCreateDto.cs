using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Application.DTOs.Order
{
    public class OrderCreateDto
    {
        public int UserId { get; set; }
        public int? BillingAddressId { get; set; }
        public int? ShippingAddressId { get; set; }

        public decimal ShippingFee { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public List<OrderItemCreateDto> Items { get; set; } = new();
    }
}
