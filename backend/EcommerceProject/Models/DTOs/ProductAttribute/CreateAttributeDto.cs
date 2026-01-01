namespace EcommerceProject.Models.DTOs.ProductAttribute
{
    public class CreateAttributeDto
    {
        public string Name { get; set; } = default!;
        public bool IsVariant { get; set; }
    }
}
