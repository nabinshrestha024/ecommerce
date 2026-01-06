namespace EcommerceProject.Models.DTOs.Orders
{
    public class OrderDetailDto
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public string? UserName { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = default!;
        public string? ShippingName { get; set; }
        public string ShippingAddress { get; set; } = default!;
        public string ShippingCity { get; set; } = default!;
        public string ShippingPhone { get; set; } = default!;
        public int PaymentMethodId { get; set; }
        public string PaymentStatus { get; set; } = default!;
        public string? PaymentGateway { get; set; }
        public string? Notes { get; set; }

        public List<OrderItemDto> Items { get; set; } = new();
    }
}
