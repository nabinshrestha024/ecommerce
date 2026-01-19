using EcommerceProject.Models.DTOs.Banners;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;

namespace EcommerceProject.Services.Implementations;

public class BannerService : IBannerService
{
    private readonly IBannerRepository _repo;

    public BannerService(IBannerRepository repo)
    {
        _repo = repo;
    }

    public Task<IEnumerable<BannerResponseDto>> GetAllBannerAsync(string sliderCode)
    {
        return _repo.GetAllBannerAsync(sliderCode);
    }

    public Task<int> CreateBannerAsync(CreateBannerDto dto)
    {
        return _repo.CreateBannerAsync(dto);
    }

    public Task UpdateBannerAsync(UpdateBannerDto dto)
    {
        return _repo.UpdateBannerAsync(dto);
    }

    public Task DeleteBannerAsync(int bannerId)
    {
        return _repo.DeleteBannerAsync(bannerId);
    }
}