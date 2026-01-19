namespace EcommerceProject.Models.DTOs.Banners;
public class CreateBannerDto
{
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
    public string? RedirectUrl { get; set; }
    public string SliderCode { get; set; } = "HOME";
    public int SortOrder { get; set; }
    public DateTime? StartAt { get; set; }
    public DateTime? EndAt { get; set; }
    public bool IsActive { get; set; } = true;
}
