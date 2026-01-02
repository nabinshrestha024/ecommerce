using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.Cart;
using EcommerceProject.Models.DTOs.ShoppingCart;
using EcommerceProject.Models.Entities;
using EcommerceProject.Repositories.Interfaces;
using Microsoft.Data.SqlClient;
using System.Data;

namespace EcommerceProject.Repositories.Implementations
{
    public class CartRepository : ICartRepository
    {
        private readonly ISqlConnectionFactory _connectionFactory;

        public CartRepository(ISqlConnectionFactory configurationFactory)
        {
            _connectionFactory = configurationFactory;
        }

        public async Task<IEnumerable<CartItemDto>> GetCartAsync(int userId)
        {
            using var connection = _connectionFactory.CreateConnection();
            return await connection.QueryAsync<CartItemDto>(
                "spCart_GetCartByUser",
                new { UserId = userId },
                commandType: CommandType.StoredProcedure);
        }

        public async Task AddToCartAsync(int userId, int variantId, int quantity)
        {
            using var conn = _connectionFactory.CreateConnection();
            await conn.ExecuteAsync("spCart_AddToCart",
                new { 
                    UserId = userId,
                    VariantId = variantId,
                    Quantity = quantity },
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateQuantityAsync(int cartId, int quantity)
        {
            using var conn = _connectionFactory.CreateConnection();
            try
            {
               
                await conn.ExecuteAsync("spCart_UpdateCartQuantity",
                    new
                    {
                        CartId = cartId,
                        Quantity = quantity
                    },
                    commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(ex.Message);
            }
            
        }

        public async Task RemoveCartAsync(int cartId, CancellationToken ct = default)
        {
            using var conn = _connectionFactory.CreateConnection();
            await conn.ExecuteAsync(
                new CommandDefinition(
                    "spCart_RemoveCartItem",
                new { 
                    CartId = cartId },
                commandType: CommandType.StoredProcedure,
                cancellationToken: ct));
        }

    }
}
