using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.Wishlist;
using EcommerceProject.Repositories.Interfaces;
using System.Data;

namespace EcommerceProject.Repositories.Implementations
{
    public class WishlistRepository : IWishlistRepository
    {
        private readonly ISqlConnectionFactory _connectionFactory;
        public WishlistRepository(ISqlConnectionFactory sqlconnectionFactory)
        {
            _connectionFactory = sqlconnectionFactory; 

        }

        public async Task<PagedResult<WishListItemDto>> GetPagedAsync(int userId, int page, int size)
        {
            using var multi = await _connectionFactory.CreateConnection().QueryMultipleAsync(
                "spWishlist_GetByUser_Paged",
                new { UserId = userId, PageNumber = page, PageSize = size },
                commandType: CommandType.StoredProcedure);

            var items = await multi.ReadAsync<WishListItemDto>();
            var total = await multi.ReadSingleAsync<int>();

            return new PagedResult<WishListItemDto>
            {
                Items = items,
                TotalCount = total,
                PageNumber = page,
                Pagesize = size
            };
        }

        public async Task AddWishlistItem(int userId, int productId)
        {
            using var conn = _connectionFactory.CreateConnection();
            await conn.ExecuteAsync("spWishlist_Add",
                new
                {
                    UserId = userId,
                    ProductId = productId
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task DeleteWishlistItem(int userId, int productId)
        {
            using var conn = _connectionFactory.CreateConnection();
            await conn.ExecuteAsync("spWishlist_Delete",
                new
                {
                    UserId = userId,
                    ProductId = productId,
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task MoveToCartAsync(int userId, int productId)
        {
            using var conn = _connectionFactory.CreateConnection();
            await conn.ExecuteAsync("spWishlist_MoveToCart",
                new
                {
                    UserId = userId,
                    PRoductId = productId
                },
                commandType: CommandType.StoredProcedure);
        }
    }
}
