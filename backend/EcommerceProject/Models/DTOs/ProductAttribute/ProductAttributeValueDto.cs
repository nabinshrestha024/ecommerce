namespace EcommerceProject.Models.DTOs.ProductAttribute
{
    public class ProductAttributeValueDto
    {
        public int AttributeValueId { get; set; }
        public string Value { get; set; } = default!;
        public int AttributeId { get; set; }
    }
}
