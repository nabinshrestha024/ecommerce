using EcommerceProject.Models.DTOs.Tags;

namespace EcommerceProject.Models.DTOs.Product
{
    public class ProductDetailsDto
    {
        public int ProductId { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; } = default!;
        public string CategoryName { get; set; } = default!;
        public string Slug { get; set; } = default!;
        public string? Description { get; set; }
        public string? ShortDescription { get; set; }
        public bool HasVariants { get; set; }
        public bool IsActive { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }

        public List<ProductVariantDto> Variants { get; set; } = new();
        public List<ProductImageDto> Images { get; set; } = new();

        public List<ProductAttributeSummaryDto> AvailableAttributes { get; set; } = new();

        public List<TagDto> Tags { get; set; } = new();

    }
}
