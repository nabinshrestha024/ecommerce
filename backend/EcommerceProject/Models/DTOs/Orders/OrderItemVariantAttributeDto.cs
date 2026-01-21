namespace EcommerceProject.Models.DTOs.Orders
{
    public class OrderItemVariantAttributeDto
    {
        public int OrderItemId { get; set; }
        public string Name { get; set; } = default!;
        public string Value { get; set; } = default!;
    }
}