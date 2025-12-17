using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Product;
using EcommerceProject.Models.Entities;
using EcommerceProject.Repositories.Interfaces;

namespace EcommerceProject.Repositories.Implementations
{
    public class ProductRepository : IProductRepository
    {
        private readonly ISqlConnectionFactory _factory;
        public ProductRepository(ISqlConnectionFactory factory)
        {
            _factory = factory;
        }
        public async Task<PagedResult<Product>> GetPagedAsync(ProductFilterDto filter, CancellationToken ct)
        {
            using var con = _factory.CreateConnection();

            var p = new DynamicParameters();
            p.Add("@Page", filter.Page);
            p.Add("@PageSize", filter.PageSize);
            p.Add("@Search", filter.Search);
            p.Add("@CategoryID", filter.CategoryID);
            p.Add("@IsActive", filter.IsActive);
            p.Add("@MinPrice", filter.MinPrice);
            p.Add("@MaxPrice", filter.MaxPrice);
            p.Add("@SortBy", filter.SortBy);
            p.Add("@SortDir", filter.SortDir);

            var rows = (await con.QueryAsync<ProductRowWithTotal>(
                "dbo.spProducts_GetPaged",
                p,
                commandType: System.Data.CommandType.StoredProcedure
            )).ToList();

            var total = rows.Count == 0 ? 0 : rows[0].TotalCount;
            var items = rows.Select(r => r.ToProduct()).ToList();

            return new PagedResult<Product>(items, filter.Page, filter.PageSize, total);
        }

        public async Task<Product?> GetByIdAsync(int productId, CancellationToken ct)
        {
            using var con = _factory.CreateConnection();
            return await con.QueryFirstOrDefaultAsync<Product>(
                "dbo.spProducts_GetById",
                new { ProductID = productId },
                commandType: System.Data.CommandType.StoredProcedure
            );
        }

        public async Task<int> CreateAsync(CreateProductRequest req, CancellationToken ct)
        {
            using var con = _factory.CreateConnection();
            return await con.QuerySingleAsync<int>(
                "dbo.spProducts_Create",
                new
                {
                    req.Name,
                    req.Slug,
                    req.Description,
                    req.ShortDescription,
                    req.Price,
                    req.CategoryID,
                    req.StockQuantity,
                    req.SKU,
                    req.Brand,
                    req.ProductImageURL,
                    req.IsActive
                },
                commandType: System.Data.CommandType.StoredProcedure
            );
        }

        public async Task<bool> UpdateAsync(int productId, UpdateProductRequest req, CancellationToken ct)
        {
            using var con = _factory.CreateConnection();
            var affected = await con.QuerySingleAsync<int>(
                "dbo.spProducts_Update",
                new
                {
                    ProductID = productId,
                    req.Name,
                    req.Slug,
                    req.Description,
                    req.ShortDescription,
                    req.Price,
                    req.CategoryID,
                    req.StockQuantity,
                    req.SKU,
                    req.Brand,
                    req.ProductImageURL,
                    req.IsActive
                },
                commandType: System.Data.CommandType.StoredProcedure
            );
            return affected > 0;
        }

        public async Task<bool> DeleteAsync(int productId, CancellationToken ct)
        {
            using var con = _factory.CreateConnection();
            var affected = await con.QuerySingleAsync<int>(
                "dbo.spProducts_Delete",
                new { ProductID = productId },
                commandType: System.Data.CommandType.StoredProcedure
            );
            return affected > 0;
        }

        private sealed class ProductRowWithTotal : Product
        {
            public int TotalCount { get; set; }
            public Product ToProduct() => new()
            {
                ProductID = ProductID,
                Name = Name,
                Slug = Slug,
                Description = Description,
                ShortDescription = ShortDescription,
                Price = Price,
                CategoryID = CategoryID,
                StockQuantity = StockQuantity,
                SKU = SKU,
                Brand = Brand,
                ProductImageURL = ProductImageURL,
                IsActive = IsActive,
                CreatedAt = CreatedAt,
                UpdatedAt = UpdatedAt
            };
        }
    }
}
