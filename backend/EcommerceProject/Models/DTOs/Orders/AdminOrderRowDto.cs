namespace EcommerceProject.Models.DTOs.Orders
{
    public class AdminOrderRowDto
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public string? UserName { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = default!;
        public string PaymentStatus { get; set; } = default!;
        public string? ShippingName { get; set; }
        public string? ShippingPhone { get; set; }

        public List<OrderItemDto> Items { get; set; } = new();
    }
}
