namespace EcommerceProject.Models.DTOs.Product
{
    public class AdminProductFilterDto
    {
        public string? Search { get; set; }
        public int? CategoryId { get; set; }
        public bool OnlyActive { get; set; } = false; 
        
    }
}
