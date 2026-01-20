using EcommerceProject.Models.DTOs.Banners;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IBannerRepository
    {
        Task<IEnumerable<BannerResponseDto>> GetAllBannerAsync();
        Task<BannerResponseDto?> GetByIdAsync(int bannerId);
        Task<int> CreateBannerAsync(CreateBannerDto dto, string imageUrl);
        Task UpdateBannerAsync(UpdateBannerDto dto);
        Task UpdateBannerImageAsync(int bannerId, string imageUrl);
        Task DeleteBannerAsync(int bannerId);
    }
}
