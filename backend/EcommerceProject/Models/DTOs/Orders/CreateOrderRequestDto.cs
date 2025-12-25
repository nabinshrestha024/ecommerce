namespace EcommerceProject.Models.DTOs.Orders
{
    public class CreateOrderRequestDto
    {
        public string? ShippingName { get; set; }
        public string ShippingAddress { get; set; } = default!;
        public string ShippingCity { get; set; } = default!;
        public string ShippingPhone { get; set; } = default!;
       
    }
}
