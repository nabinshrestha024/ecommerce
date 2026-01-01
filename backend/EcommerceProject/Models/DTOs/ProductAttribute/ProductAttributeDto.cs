namespace EcommerceProject.Models.DTOs.ProductAttribute
{
    public class ProductAttributeDto
    {
        public int AttributeId { get; set; }
        public string Name { get; set; } = default!;
        public bool IsVariant { get; set; }
        public List<ProductAttributeValueDto> Values { get; set; } = new();
    }
}
