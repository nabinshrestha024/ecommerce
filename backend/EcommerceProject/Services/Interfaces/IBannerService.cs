using EcommerceProject.Models.DTOs.Banners;

namespace EcommerceProject.Services.Interfaces;

public interface IBannerService
{
    Task<IEnumerable<BannerResponseDto>> GetAllBannerAsync(string sliderCode);
    Task<int> CreateBannerAsync(CreateBannerDto dto);
    Task UpdateBannerAsync(UpdateBannerDto dto);
    Task DeleteBannerAsync(int bannerId);
}