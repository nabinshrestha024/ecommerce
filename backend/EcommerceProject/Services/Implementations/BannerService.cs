using EcommerceProject.Models.DTOs.Banners;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using EcommerceProject.Exceptions;
using System.Security.AccessControl;

namespace EcommerceProject.Services.Implementations
{
    public class BannerService : IBannerService
    {
        private readonly IBannerRepository _repo;
        private readonly IFileStorageService _files;

        private readonly IUrlService _urlService;

        public BannerService(IBannerRepository repo, IFileStorageService files, IUrlService urlService)
        {
            _repo = repo;
            _files = files;
            _urlService = urlService;
        }

        public async Task<IEnumerable<BannerResponseDto>> GetActiveBannerAsync()
        {
            var banners = await _repo.GetActiveBannerAsync();

            foreach (var banner in banners)
            {
                if (!string.IsNullOrEmpty(banner.ImageUrl))
                {
                    banner.ImageUrl = _urlService.ToAbsoluteUrl(banner.ImageUrl);
                }
            }

            return banners;
        }

        public async Task<IEnumerable<BannerResponseDto>> GetAllBannerAsync()
        {
            var banners = await _repo.GetAllBannerAsync();
            var bannerList = banners.ToList();

            foreach(var banner in bannerList)
            {
                if( !string.IsNullOrEmpty(banner.ImageUrl))
                {
                    banner.ImageUrl = _urlService.ToAbsoluteUrl(banner.ImageUrl);
                }
            }

            return bannerList;
        }

        public async Task<int> CreateBannerAsync(
            CreateBannerDto dto,
            IFormFile? imageFile,
            CancellationToken ct)
        {

            var bannerId = await _repo.CreateBannerAsync(dto, string.Empty);

            if (imageFile != null)
            {
                var imagePath = await _files.SaveBannerImageAsync(imageFile, bannerId, ct);
                await _repo.UpdateBannerImageAsync(bannerId, imagePath);
            }

            return bannerId;
        }

        public async Task UpdateBannerAsync(int id, UpdateBannerDto dto, IFormFile? imageFile, CancellationToken ct)
        {
            var banner = await _repo.GetByIdAsync(id)
                        ?? throw new BadRequestException("Banner not found");

            await _repo.UpdateBannerAsync(id, dto);

            if (imageFile != null)
            {
                if (!string.IsNullOrEmpty(banner.ImageUrl))
                    await _files.DeleteBannerImageAsync(banner.ImageUrl, ct);

                var savedPath = await _files.SaveBannerImageAsync(imageFile, id, ct);
                
                await _repo.UpdateBannerImageAsync(id, savedPath);
            }
        }

        public Task DeleteBannerAsync(int bannerId)
        {
            return _repo.DeleteBannerAsync(bannerId);
        }
    }
}