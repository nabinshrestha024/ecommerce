namespace EcommerceProject.Models.DTOs.Product
{
    public class ProductImageDto
    {
        public int ProductImageId { get; set; }
        public string ImageUrl { get; set; } = default!;
        public bool IsPrimary { get; set; }
        public int SortOrder { get; set; }
    }
}
