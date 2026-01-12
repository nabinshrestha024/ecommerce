namespace EcommerceProject.Models.DTOs.Category
{
    public class CategoryUpsertRequest
    {
        public string Name { get; set; } = default!;
        public string? Description { get; set; }
        public bool IsFeatured { get; set; }
        public int SortOrder { get; set; }
        public bool IsActive { get; set; } = true;

        public IFormFile? Image { get; set; }
    }
}
