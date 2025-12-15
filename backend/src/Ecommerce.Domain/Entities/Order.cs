using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Domain.Entities
{
    public class Order
    {
        public int OrderID {  get; set; }
        public string? OrderNumber {  get; set; }
        public int UserId { get; set; }
        public string? ShippingAddress {  get; set; }
        public string? BillingAddress {  get; set; }
        public decimal SubTotal {  get; set; }
        public decimal ShippingCost { get; set; }
        public decimal Tax {  get; set; }
        public decimal Total { get; set; }
        public int PaymentStatus {  get; set; }
        public int FulfillmentStatus {  get; set; }
        public DateTime PlacedAt { get; set; }
        public DateTime CompletedAt { get; set; }
        public DateTime CanceledAt {  get; set; }
        public string? Notes {  get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
