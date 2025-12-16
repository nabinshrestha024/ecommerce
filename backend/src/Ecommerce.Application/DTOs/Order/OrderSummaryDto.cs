using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Application.DTOs.Order
{
    public class OrderSummaryDto
    {
        public int TotalOrders { get; set; }
        public decimal TotalRevenue { get; set; }
        public decimal DeliveredRevenue { get; set; }
    }

}
