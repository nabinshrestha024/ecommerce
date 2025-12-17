using EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Product;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;

namespace EcommerceProject.Services.Implementations
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repo;

        public ProductService(IProductRepository repo)
        {
            _repo = repo;
        }

        public async Task<PagedResult<ProductListItemDto>> CatalogListAsync(
            ProductFilterDto filter,
            CancellationToken ct)
        {
            filter.IsActive = true;

            var paged = await _repo.GetPagedAsync(filter, ct);

            var items = paged.Items.Select(p => new ProductListItemDto
            {
                ProductID = p.ProductID,
                Name = p.Name,
                Slug = p.Slug,
                Price = p.Price,
                CategoryID = p.CategoryID,
                StockQuantity = p.StockQuantity,
                SKU = p.SKU,
                Brand = p.Brand,
                ProductImageURL = p.ProductImageURL
            }).ToList();

            return new PagedResult<ProductListItemDto>(
                items,
                paged.Page,
                paged.PageSize,
                paged.TotalCount
            ); 
            

        }
        public async Task<ProductDetailDto?> GetDetailAsync(
            int productId,
            bool admin,
            CancellationToken ct)
        {
            var p = await _repo.GetByIdAsync(productId, ct);
            if (p is null) return null;

            if (!admin && !p.IsActive) return null;

            return new ProductDetailDto
            {
                ProductID = p.ProductID,
                Name = p.Name,
                Slug = p.Slug,
                Description = p.Description,
                ShortDescription = p.ShortDescription,
                Price = p.Price,
                CategoryID = p.CategoryID,
                StockQuantity = p.StockQuantity,
                SKU = p.SKU,
                Brand = p.Brand,
                ProductImageURL = p.ProductImageURL,
                IsActive = p.IsActive,
                CreatedAt = p.CreatedAt,
                UpdatedAt = p.UpdatedAt
            };

        }

        public Task<int> CreateAsync(CreateProductRequest req, CancellationToken ct)
            => _repo.CreateAsync(req, ct);

        public Task<bool> UpdateAsync(int productId, UpdateProductRequest req, CancellationToken ct)
        {
            return _repo.UpdateAsync(productId, req, ct);
        }
        public Task<bool> DeleteAsync(int productId, CancellationToken ct)
        {
            return _repo.DeleteAsync(productId, ct);
        }
            
    }
}
