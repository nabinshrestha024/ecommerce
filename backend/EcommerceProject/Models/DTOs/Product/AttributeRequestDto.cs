namespace EcommerceProject.Models.DTOs.Product
{
    public class AttributeRequestDto
    {
        public string Name { get; set; } = default!;  
        public List<string> Values { get; set; } = new(); 
    }
}