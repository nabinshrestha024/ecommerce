namespace EcommerceProject.Models.DTOs.ShoppingCart
{
    public class CartItemDto
    {
        public int UserId { get; set; }
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public int VariantId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string SKU { get; set; }
        public string ProductImageUrl { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime AddedDate { get; set; }

        public int? DiscountId { get; set; }
        public string? DiscountName { get; set; }
        public string? DiscountType { get; set; }     // Flat / Percentage
        public decimal? DiscountValue { get; set; }
        public decimal? DiscountAmount { get; set; }  // per unit
        public decimal? FinalPrice { get; set; }

        public string? AttributesJson { get; set; }
        public List<CartItemAttributeDto> Attributes { get; set; } = new();
    }
}
