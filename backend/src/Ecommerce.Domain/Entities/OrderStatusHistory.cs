using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Domain.Entities
{
    public class OrderStatusHistory
    {
        public int OrderStatusHistoryId { get; set; }
        public int OrderId { get; set; }
        public short? OldStatus { get; set; }
        public short NewStatus { get; set; }
        public string? ChangedBy { get; set; }
        public DateTime ChangedAt { get; set; }
        public string? Notes { get; set; }
    }
}
