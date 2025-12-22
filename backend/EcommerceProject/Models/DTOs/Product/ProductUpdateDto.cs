namespace EcommerceProject.Models.DTOs.Product
{
    public class ProductUpdateDto
    {
        public int CategoryId { get; set; }
        public string Name { get; set; } = default!;
        public string Slug { get; set; } = default!;
        public string? Description { get; set; }
        public string? ShortDescription { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public string SKU { get; set; } = default!;
        public bool IsActive { get; set; }
    }
}
