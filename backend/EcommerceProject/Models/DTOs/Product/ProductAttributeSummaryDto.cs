namespace EcommerceProject.Models.DTOs.Product
{   
    public class ProductAttributeSummaryDto
    {
        public string Name { get; set; } = default!;
        public List<string> Values { get; set; } = new();
    }
}