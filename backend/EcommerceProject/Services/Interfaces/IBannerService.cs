using EcommerceProject.Models.DTOs.Banners;
using Microsoft.AspNetCore.Http;

namespace EcommerceProject.Services.Interfaces;

public interface IBannerService
{
    Task<IEnumerable<BannerResponseDto>> GetAllBannerAsync();

    Task<int> CreateBannerAsync(
        CreateBannerDto dto,
        IFormFile image,
        CancellationToken ct);

    Task UpdateBannerAsync(
        UpdateBannerDto dto,
        IFormFile? image,
        CancellationToken ct);

    Task DeleteBannerAsync(int bannerId);
}
