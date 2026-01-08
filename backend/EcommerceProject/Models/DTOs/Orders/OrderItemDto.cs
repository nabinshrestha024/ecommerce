namespace EcommerceProject.Models.DTOs.Orders
{
    public class OrderItemDto
    {
        public int OrderItemId { get; set; }
        public int ProductId { get; set; }
        public int VariantId { get; set; }
        public string ProductName { get; set; } = default!;
        public string? ProductImageUrl { get; set; }
        public string? ProductDescription { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal LineTotal { get; set; }

        public List<OrderItemVariantAttributeDto> Variant { get; set; } = new();
    }
}
