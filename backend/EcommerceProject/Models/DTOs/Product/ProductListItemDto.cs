namespace EcommerceProject.Models.DTOs.Product
{
    public class ProductListItemDto
    {
        public int ProductId { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = default!;
        public string Name { get; set; } = default!;
        public string Slug { get; set; } = default!;
        public string? Description { get; set; }
        public string? ShortDescription { get; set; }
        public bool HasVariants { get; set; }
        public bool IsActive { get; set; }
        public string? PrimaryImageUrl { get; set; }

        public List<ProductVariantDto> Variants { get; set; } = new(); 
    }
}
