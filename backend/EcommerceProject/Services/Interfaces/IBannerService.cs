using EcommerceProject.Models.DTOs.Banners;
using Microsoft.AspNetCore.Http;

namespace EcommerceProject.Services.Interfaces;

public interface IBannerService
{
    Task<IEnumerable<BannerResponseDto>> GetActiveBannerAsync();

    Task<IEnumerable<BannerResponseDto>> GetAllBannerAsync(string sortOrder);

    Task<int> CreateBannerAsync(
        CreateBannerDto dto,
        IFormFile image,
        CancellationToken ct);

    Task UpdateBannerAsync(
        int id,
        UpdateBannerDto dto,
        IFormFile? image,
        CancellationToken ct);

    Task DeleteBannerAsync(int bannerId);
}
