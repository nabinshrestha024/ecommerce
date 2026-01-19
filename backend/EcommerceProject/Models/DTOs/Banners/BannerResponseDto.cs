namespace EcommerceProject.Models.DTOs.Banners;

public class BannerResponseDto
{
    public int BannerId { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
    public string? RedirectUrl { get; set; }
    public int SortOrder { get; set; }
}
