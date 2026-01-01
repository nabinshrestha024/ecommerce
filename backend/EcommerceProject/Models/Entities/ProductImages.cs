namespace EcommerceProject.Models.Entities
{
    public class ProductImages
    {
        public int ProductImageId { get; set; }
        public int ProductId { get; set; }
        public int? VariantId { get; set; }
        public string ImageUrl { get; set; } = default!;
        public bool IsPrimary { get; set; }
        public int SortOrder { get; set; }
        public DateTime CreatedAt { get; set; }
        public Product Product { get; set; } = default!;
        public ProductVariant? Variant { get; set; }
    }
}
