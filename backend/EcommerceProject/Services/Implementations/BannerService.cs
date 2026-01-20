using EcommerceProject.Models.DTOs.Banners;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using EcommerceProject.Exceptions;
using Microsoft.AspNetCore.Http;

namespace EcommerceProject.Services.Implementations
{
    public class BannerService : IBannerService
    {
        private readonly IBannerRepository _repo;
        private readonly IFileStorageService _files;

        public BannerService(IBannerRepository repo, IFileStorageService files)
        {
            _repo = repo;
            _files = files;
        }

        public Task<IEnumerable<BannerResponseDto>> GetAllBannerAsync()
        {
            return _repo.GetAllBannerAsync();
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


        public async Task UpdateBannerAsync(UpdateBannerDto dto, IFormFile? imageFile, CancellationToken ct)
        {
            var banner = await _repo.GetByIdAsync(dto.BannerId)
                         ?? throw new BadRequestException("Banner not found");

            await _repo.UpdateBannerAsync(dto);

            if (imageFile != null)
            {
                if (!string.IsNullOrEmpty(banner.ImageUrl))
                    await _files.DeleteBannerImageAsync(banner.ImageUrl, ct);

                var savedPath = await _files.SaveBannerImageAsync(imageFile, dto.BannerId, ct);
                await _repo.UpdateBannerImageAsync(dto.BannerId, savedPath);
            }
        }

        public Task DeleteBannerAsync(int bannerId)
        {
            return _repo.DeleteBannerAsync(bannerId);
        }
    }
}