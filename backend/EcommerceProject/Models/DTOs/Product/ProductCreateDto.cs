namespace EcommerceProject.Models.DTOs.Product
{
    public class ProductCreateDto
    {
        public int CategoryId { get; set; }
        public string Name { get; set; } = default!;
        public string? Description { get; set; }
        public string? ShortDescription { get; set; }
        public bool IsActive { get; set; } = true;
        public bool HasVariants { get; set; }
    }
}
