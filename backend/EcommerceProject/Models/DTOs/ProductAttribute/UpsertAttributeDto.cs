namespace EcommerceProject.Models.DTOs.ProductAttribute
{
    public class UpsertAttributeDto
    {
        public string Name { get; set; } = default!;
        public bool IsVariant { get; set; }
    }
}
