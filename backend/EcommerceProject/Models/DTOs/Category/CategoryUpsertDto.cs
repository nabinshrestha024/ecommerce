using System.Text.Json.Serialization;

namespace EcommerceProject.Models.DTOs.Category
{
    public class CategoryUpsertDto
    {
        public string? Name { get; set; }
        [JsonIgnore]
        public string? Slug { get; set; }
        public string? CategoryImageURL { get; set; }
        public string? Description { get; set; }
        public bool IsFeatured { get; set; }

        public int SortOrder { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
