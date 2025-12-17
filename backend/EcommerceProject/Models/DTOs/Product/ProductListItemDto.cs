namespace EcommerceProject.Models.DTOs
{
    public class ProductListItemDto
    {
        public int ProductID { get; init; }
        public string Name { get; init; } = default!;
        public string Slug { get; init; } = default!;
        public decimal Price { get; init; }
        public int CategoryID { get; init; }
        public int StockQuantity { get; init; }
        public string SKU { get; init; } = default!;
        public string? Brand { get; init; }
        public string? ProductImageURL { get; init; }
    }

}
