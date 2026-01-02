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

        public async Task<PagedResult<WishListItemDto>> GetPagedAsync(int userId, int page, int size, CancellationToken ct = default)
        {
            using var multi = await _connectionFactory.CreateConnection().QueryMultipleAsync(
                new CommandDefinition(
                "spWishlist_GetByUser_Paged",
                new { UserId = userId, PageNumber = page, PageSize = size },
                commandType: CommandType.StoredProcedure,
                cancellationToken: ct));

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

        public async Task AddWishlistItem(int userId, int variantId,CancellationToken ct = default)
        {
            using var conn = _connectionFactory.CreateConnection();
            await conn.ExecuteAsync("spWishlist_Add",
                new
                {
                    UserId = userId,
                    VariantId = variantId
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task DeleteWishlistItem(int wishlistId)
        {
            using var conn = _connectionFactory.CreateConnection();
            await conn.ExecuteAsync("spWishlist_Delete",
                new
                {
                    WishlistId = wishlistId,
                    
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task MoveToCartAsync(int wishlistId, int userId, int quantity)
        {
            using var conn = _connectionFactory.CreateConnection();
            await conn.ExecuteAsync("spWishlist_MoveToCart",
                new
                {
                    WishlistId = wishlistId,
                    UserId = userId,
                    Quantity = quantity
                },
                commandType: CommandType.StoredProcedure);
        }
    }
}
