using EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Product;
using EcommerceProject.Models.Entities;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IProductRepository
    {
        Task<PagedResult<ProductListItemDto>> GetPagedAsync(int? categoryId, string? search, List<string>? tags, decimal? minPrice, decimal? maxPrice, int page, int pageSize, bool onlyActive, CancellationToken ct);
        Task<ProductDetailsDto?> GetBySlugOrIdAsync(string slugOrId, bool onlyActive, CancellationToken ct);
        Task InsertImageAsync(int productId, string imageUrl, bool isPrimary, int sortOrder, CancellationToken ct);
        Task<int> DeleteImagesByProductIdAsync(int productId, CancellationToken ct);

        Task<ProductDetailsDto?> GetByIdAsync(int productId, CancellationToken ct);
        Task<int?> GetMaxSlugSuffixAsync(string baseSlug, CancellationToken ct);

        Task<int> CreateAsync(int categoryId, string name, string slug, string? description, string? shortDescription, bool hasVariants, bool isActive, List<int> attributeValueIds, CancellationToken ct);
        Task<int> GetAttributeIdByNameAsync(string name); 
        Task<int> GetAttributeValueIdAsync(int attributeId, string value); 

        Task<bool> UpdateAsync(int productId, int categoryId, string name, string slug,string? description, string? shortDescription, bool isActive, CancellationToken ct);
        Task<bool> DeleteAsync(int id, CancellationToken ct);

        Task InsertImagesBulkAsync(int productId, IReadOnlyList<(string url, bool isPrimary, int sortOrder)> images, CancellationToken ct);
        Task<int?> GetProductIdByNameAsync(string productName);
    }
}
