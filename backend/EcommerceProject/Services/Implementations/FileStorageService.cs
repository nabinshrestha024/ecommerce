using EcommerceProject.Services.Interfaces;

namespace EcommerceProject.Services.Implementations
{
    public class FileStorageService : IFileStorageService
    {
        private static readonly HashSet<string> Allowed = new(StringComparer.OrdinalIgnoreCase)
    { ".jpg", ".jpeg", ".png", ".webp" };

        private readonly IWebHostEnvironment _env;
        private readonly ILogger<FileStorageService> _logger;
        public FileStorageService(IWebHostEnvironment env, ILogger<FileStorageService> logger)
        {
            _env = env;
            _logger = logger;
        }

        public async Task<IReadOnlyList<string>> SaveProductImagesAsync(IFormFileCollection files, CancellationToken ct)
        {
            if (files.Count == 0) return Array.Empty<string>();

            var root = _env.WebRootPath ?? "wwwroot";
            var folder = Path.Combine(root, "images", "products");
            Directory.CreateDirectory(folder);

            var urls = new List<string>(files.Count);

            foreach (var file in files)
            {
                if (file.Length <= 0) continue;

                var ext = Path.GetExtension(file.FileName);
                if (!Allowed.Contains(ext))
                    throw new InvalidOperationException($"Invalid image format: {ext}");

                var name = $"{Guid.NewGuid():N}{ext.ToLowerInvariant()}";
                var path = Path.Combine(folder, name);

                await using var fs = new FileStream(path, FileMode.Create);
                await file.CopyToAsync(fs, ct);

                urls.Add($"/images/products/{name}");
            }

            return urls;
        }

        public async Task<string> SaveProfileImageAsync(IFormFile file, int userId, CancellationToken ct)
        {
            if (file == null || file.Length <= 0)
                throw new ArgumentException("No file provided");

            var ext = Path.GetExtension(file.FileName);
            if (!Allowed.Contains(ext))
                throw new InvalidOperationException($"Invalid image format: {ext}");

            if (file.Length > 5 * 1024 * 1024)
                throw new InvalidOperationException("File size exceeds 5MB limit");

            var root = _env.WebRootPath ?? "wwwroot";
            var folder = Path.Combine(root, "images", "profile");
            Directory.CreateDirectory(folder);

            await CleanupOldProfileImages(userId, folder);

            var name = $"user_{userId}_{Guid.NewGuid():N}{ext.ToLowerInvariant()}";
            var path = Path.Combine(folder, name);

            await using var fs = new FileStream(path, FileMode.Create);
            await file.CopyToAsync(fs, ct);

            _logger.LogInformation("Saved profile image for user {UserId}: {FileName}", userId, name);
            return $"/images/profile/{name}";
        }

        public async Task<bool> DeleteProfileImageAsync(string imageUrl, CancellationToken ct)
        {
            if (string.IsNullOrEmpty(imageUrl))
                return true;

            try
            {
                var fileName = Path.GetFileName(imageUrl);
                if (string.IsNullOrEmpty(fileName))
                    return false;

                var root = _env.WebRootPath ?? "wwwroot";
                var filePath = Path.Combine(root, "images", "profile", fileName);

                if (File.Exists(filePath))
                {
                    await Task.Run(() => File.Delete(filePath), ct);
                    _logger.LogInformation("Deleted profile image: {FileName}", fileName);
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Error deleting profile image: {ImageUrl}", imageUrl);
                return false;
            }
        }

        private async Task CleanupOldProfileImages(int userId, string folderPath)
        {
            try
            {
                if (!Directory.Exists(folderPath))
                    return;

                var pattern = $"user_{userId}_*";
                var oldFiles = Directory.GetFiles(folderPath, pattern);

                if (oldFiles.Length > 3)
                {
                    var filesToDelete = oldFiles
                        .Select(f => new FileInfo(f))
                        .OrderBy(f => f.CreationTime)
                        .Take(oldFiles.Length - 3)
                        .ToList();

                    foreach (var fileInfo in filesToDelete)
                    {
                        try
                        {
                            await Task.Run(() => fileInfo.Delete());
                            _logger.LogDebug("Cleaned up old profile image: {FileName}", fileInfo.Name);
                        }
                        catch (Exception ex)
                        {
                            _logger.LogWarning(ex, "Failed to delete old profile image: {FileName}", fileInfo.Name);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Error cleaning up old profile images for user {UserId}", userId);
            }
        }
    }
}