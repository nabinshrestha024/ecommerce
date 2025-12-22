using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.Cart;
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

        public async Task<IEnumerable<ShoppingCartItem>> GetCartAsync(int userId)
        {
            using var conn = _connectionFactory.CreateConnection();
            
            return await conn.QueryAsync<ShoppingCartItem>("spCart_GetCartByUser",
                new {
                    UserId = userId },
                commandType: CommandType.StoredProcedure);
        }

        public async Task AddToCartAsync(int userId, int productId, int quantity)
        {
            using var conn = _connectionFactory.CreateConnection();
            await conn.ExecuteAsync("spCart_AddToCart",
                new { 
                    UserId = userId,
                    ProductId = productId,
                    Quantity = quantity },
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateQuantityAsync(int cartItemId, int quantity)
        {
            using var conn = _connectionFactory.CreateConnection();
            await conn.ExecuteAsync("spCart_UpdateQuantiy",
                new { 
                    CartItemId = cartItemId,
                    Quantity = quantity },
                commandType: CommandType.StoredProcedure);
        }

        public async Task RemoveCartAsync(int cartItemId)
        {
            using var conn = _connectionFactory.CreateConnection();
            await conn.ExecuteAsync("spCart_RemoveCartItem",
                new { 
                    CartItemId = cartItemId },
                commandType: CommandType.StoredProcedure);
        }
    }
}
