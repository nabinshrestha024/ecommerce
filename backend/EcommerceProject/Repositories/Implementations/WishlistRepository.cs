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

        public async Task<IEnumerable<WishListItemDto>> GetWishlist(int userId)
        {
            using var conn = _connectionFactory.CreateConnection();

            return await conn.QueryAsync<WishListItemDto>("spWishlist_GetByUser",
                new
                {
                    UserId = userId
                },
                commandType: CommandType.StoredProcedure);
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

        public async Task DeleteWishlistItem(int wishlistItemId)
        {
            using var conn = _connectionFactory.CreateConnection();
            await conn.ExecuteAsync("spWishlist_Delete",
                new
                {
                    WishlistItemId = wishlistItemId
                },
                commandType: CommandType.StoredProcedure);
        }
    }
}
