namespace EcommerceProject.Services.Interfaces
{
    public interface IFileStorageService
    {
        Task<IReadOnlyList<string>> SaveProductImagesAsync(IFormFileCollection files, CancellationToken ct);
    }
}
