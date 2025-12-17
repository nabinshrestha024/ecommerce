namespace EcommerceProject.Models.DTOs.Product
{
    public class ProductDetailDto
    {
        public int ProductID { get; init; }
        public string Name { get; init; } = default!;
        public string Slug { get; init; } = default!;
        public string? Description { get; init; }
        public string? ShortDescription { get; init; }
        public decimal Price { get; init; }
        public int CategoryID { get; init; }
        public int StockQuantity { get; init; }
        public string SKU { get; init; } = default!;
        public string? Brand { get; init; }
        public string? ProductImageURL { get; init; }
        public bool IsActive { get; init; }
        public DateTime CreatedAt { get; init; }
        public DateTime UpdatedAt { get; init; }
    }

}
