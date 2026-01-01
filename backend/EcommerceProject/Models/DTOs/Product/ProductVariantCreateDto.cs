namespace EcommerceProject.Models.DTOs.Product
{
    public class ProductVariantCreateDto
    {
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public bool IsDefault { get; set; } = true;
        public bool IsActive { get; set; } = true;

        public List<int>? AttributeValueIds { get; set; }
    }
}
