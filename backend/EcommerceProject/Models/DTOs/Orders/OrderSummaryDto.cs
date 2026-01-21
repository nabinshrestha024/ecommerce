namespace EcommerceProject.Models.DTOs.Orders
{
    public class OrderSummaryDto
    {
        public int OrderId { get; set; }
        public int UserId { get; set;}
        public string FullName { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }

        public decimal GrandTotal { get; set; }
        public string Status { get; set; } = default!;
        public string PaymentStatus { get; set; } = default!;
        public string ShippingCity { get; set; } = default!;

        public List<OrderItemDto> Items { get; set; } = new();

    }
}
