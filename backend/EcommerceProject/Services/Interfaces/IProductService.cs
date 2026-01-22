using EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Product;
using EcommerceProject.Models.DTOs.Tags;
using EcommerceProject.Models.Entities;

namespace EcommerceProject.Services.Interfaces
{
    public interface IProductService
    {
        Task<ProductCatalogResponse> GetPagedAsync(int? categoryId, string? search, string?categoryName, List<string>? tags, decimal? minPrice, decimal? maxPrice, int page, int pageSize, CancellationToken ct);
        Task<ProductDetailsDto?> GetDetailsAsync(string slugOrId, CancellationToken ct);
        Task<ProductCatalogResponse> AdminGetProductsAsync(AdminProductFilterDto filter, PaginationDto pagination, CancellationToken ct);
        Task<int> CreateAsync(ProductCreateDto dto, IFormFileCollection? images, int? primaryIndex, CancellationToken ct);
        Task<bool> UpdateAsync(int id, ProductUpdateDto dto, IFormFileCollection? images, int? primaryIndex, CancellationToken ct);
        Task<ProductDetailsDto?> AdminGetDetailsAsync(string slugOrId, CancellationToken ct);


        Task<bool> DeleteAsync(int id, CancellationToken ct);
    }
}
