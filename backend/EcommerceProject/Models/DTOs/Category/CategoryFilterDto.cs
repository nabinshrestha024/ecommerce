namespace EcommerceProject.Models.DTOs.Category
{
    public class CategoryFilterDto
    {
        public string? Search { get; set; }
        public bool OnlyActive { get; set; } = true;
    }
}
