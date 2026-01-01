namespace EcommerceProject.Models.Entities
{
    public class ProductAttributeValue
    {
        public int AttributeValueId { get; set; }
        public int AttributeId { get; set; }

        public string Value { get; set; } = default!;
        public DateTime CreatedAt { get; set; }
    }
}
