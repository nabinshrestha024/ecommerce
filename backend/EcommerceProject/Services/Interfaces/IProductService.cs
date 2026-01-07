using EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Product;
using EcommerceProject.Models.DTOs.Tags;

namespace EcommerceProject.Services.Interfaces
{
    public interface IProductService
    {
        Task<PagedResult<ProductListItemDto>> GetPagedAsync(int? categoryId, string? search, List<string>? tags, decimal? minPrice, decimal? maxPrice, int page, int pageSize, CancellationToken ct);
        Task<ProductDetailsDto?> GetDetailsAsync(string slugOrId, CancellationToken ct);
        Task<PagedResult<ProductListItemDto>> AdminGetProductsAsync(AdminProductFilterDto filter, PaginationDto pagination, CancellationToken ct);
        Task<int> CreateAsync(ProductCreateDto dto, IFormFileCollection? images, int? primaryIndex, CancellationToken ct);
        Task<bool> UpdateAsync(int id, ProductUpdateDto dto, IFormFileCollection? images, int? primaryIndex, CancellationToken ct);
        
        Task<bool> DeleteAsync(int id, CancellationToken ct);
    }
}
