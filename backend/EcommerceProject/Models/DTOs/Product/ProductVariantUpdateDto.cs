namespace EcommerceProject.Models.DTOs.Product
{
    public class ProductVariantUpdateDto
    {
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public bool IsActive { get; set; }
        public bool IsDefault { get; set; }
    }
}
