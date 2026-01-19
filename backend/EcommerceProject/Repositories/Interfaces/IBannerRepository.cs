using EcommerceProject.Models.DTOs.Banners;

namespace EcommerceProject.Repositories.Interfaces;

public interface IBannerRepository
{
    Task<IEnumerable<BannerResponseDto>> GetAllBannerAsync(string sliderCode);
    Task<int> CreateBannerAsync(CreateBannerDto dto);
    Task UpdateBannerAsync(UpdateBannerDto dto);
    Task DeleteBannerAsync(int bannerId);
}