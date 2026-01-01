namespace EcommerceProject.Models.Entities
{
    public class ProductAttribute
    {
        public int AttributeId { get; set; }
        public string Name { get; set; } = default!;
        public bool IsVariant { get; set; }
        public DateTime CreatedAt { get; set; }

        public ICollection<ProductAttributeValue> Values { get; set; } = new List<ProductAttributeValue>();
    }
}
