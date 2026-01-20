namespace EcommerceProject.Models.DTOs.Banners;
public class CreateBannerDto
{
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string? RedirectUrl { get; set; }
    public int SortOrder { get; set; }
    public bool IsActive { get; set; } = true;
    
    public IFormFile? ImageUrl { get; set; }
}
