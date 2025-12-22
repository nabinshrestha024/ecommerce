using EcommerceProject.Services.Interfaces;

namespace EcommerceProject.Services.Implementations
{
    public class FileStorageService : IFileStorageService
    {
        private static readonly HashSet<string> Allowed = new(StringComparer.OrdinalIgnoreCase)
    { ".jpg", ".jpeg", ".png", ".webp" };

        private readonly IWebHostEnvironment _env;

        public FileStorageService(IWebHostEnvironment env) => _env = env;

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
    }
}
