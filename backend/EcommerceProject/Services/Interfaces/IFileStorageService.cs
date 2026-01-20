namespace EcommerceProject.Services.Interfaces
{
    public interface IFileStorageService
    {
        Task<IReadOnlyList<string>> SaveProductImagesAsync(IFormFileCollection files, CancellationToken ct);
        Task<string> SaveProfileImageAsync(IFormFile file, int userId, CancellationToken ct);
        Task<string> SaveCategoryImageAsync(IFormFile file, CancellationToken ct);
        Task<bool> DeleteProfileImageAsync(string imageUrl, CancellationToken ct);

        Task<string> SaveBannerImageAsync(IFormFile file, int bannerId, CancellationToken ct);
        Task<bool> DeleteBannerImageAsync(string imageUrl, CancellationToken ct);
    }
}
