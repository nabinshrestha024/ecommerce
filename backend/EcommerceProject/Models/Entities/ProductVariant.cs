namespace EcommerceProject.Models.Entities
{
    public class ProductVariant
    {
        public int VariantId { get; set; }
        public int ProductId { get; set; }

        public string SKU { get; set; } = default!;
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }

        public bool IsActive { get; set; }
        public bool IsDefault { get; set; }

        public DateTime CreatedAt { get; set; }

        public Product Product { get; set; } = default!;
        public ICollection<VariantAttributeValue> AttributeValues { get; set; } = new List<VariantAttributeValue>();
        public ICollection<ProductImages> Images { get; set; } = new List<ProductImages>();
    }
}
