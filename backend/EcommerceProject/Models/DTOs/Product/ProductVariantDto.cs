namespace EcommerceProject.Models.DTOs.Product
{
    public class ProductVariantDto
    {
        public int VariantId { get; set; }
        public string SKU { get; set; } = default!;
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public bool IsDefault { get; set; }
        public bool IsActive { get; set; }

        public Dictionary<string, string> Attributes { get; set; } = new();
    }
}
