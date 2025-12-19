namespace EcommerceProject.Models.Entities
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; } = default!;
        public string? Slug { get; set; }
        public string? CategoryImageURL { get; set; }
        public string? Description { get; set; }
        public bool IsFeatured { get; set; }
        public int SortOrder { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
