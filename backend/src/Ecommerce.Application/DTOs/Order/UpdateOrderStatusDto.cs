using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Application.DTOs.Order
{
    public class UpdateOrderStatusDto
    {
        public int OrderID { get; set; }
        public int PaymentStatus { get; set; }
        public int FulfillmentStatus { get; set; }

    }
}
