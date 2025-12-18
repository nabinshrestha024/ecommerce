namespace EcommerceProject.Models.DTOs.Product
{
    public class CreateProductRequest
    {
        public string Name { get; set; }
        public string Slug { get; set; }
        public string? Description { get; set; }
        public string? ShortDescription { get; set; }
        public decimal Price { get; set; }
        public int CategoryID { get; set; }
        public int StockQuantity { get; set; }
        public string SKU { get; set; }
        public string? Brand { get; set; }
        public string? ProductImageURL { get; set; }
        public bool IsActive { get; set; }
    }
}
