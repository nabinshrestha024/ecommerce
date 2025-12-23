namespace EcommerceProject.Models.DTOs.Profile
{
    public class UserOrderDetailsDto
    {
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string? Status { get; set; }

        public string? ShippingName { get; set; }
        public string? ShippingAddress { get; set; }
        public string? ShippingCity { get; set; }
        public string? ShippingPhone { get; set; }

        public string? PaymentMethod { get; set; }
        public string? PaymentStatus { get; set; }

        public List<UserOrdersDto> Items { get; set; } = new();
    }
}