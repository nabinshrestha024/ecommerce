using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Application.Common.Models
{
    public class OrderFilterParams
    {
        public int? UserId { get; set; }
        public string? OrderNumber { get; set; }
        public short? Status { get; set; }              // matches sales.Orders.Status (SMALLINT)
        public DateTime? PlacedFromUtc { get; set; }
        public DateTime? PlacedToUtc { get; set; }
        public decimal? MinTotal { get; set; }
        public decimal? MaxTotal { get; set; }
    }
}
