using Dapper;
using EcommerceProject.Models.DTOs.Cart;
using EcommerceProject.Repositories.Interfaces;
using Microsoft.Data.SqlClient;
using System.Data;

namespace EcommerceProject.Repositories.Implementations
{
    public class CartRepository : ICartRepository
    {
        private readonly string _connectionString;

        public CartRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<IEnumerable<CartItemDto>> GetCart(int userId)
        {
            using var conn = new SqlConnection(_connectionString);
            return await conn.QueryAsync<CartItemDto>("spCard_GetCartItems",
                new {
                    UserId = userId },
                commandType: CommandType.StoredProcedure);
        }

        public async Task AddCartItem(int userId, int productId, int quantity)
        {
            using var conn = new SqlConnection(_connectionString);
            await conn.ExecuteAsync("spCart_AddCartItem",
                new { 
                    UserId = userId,
                    ProductId = productId,
                    Quantity = quantity },
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateCartItem(int cartItemId, int quantity)
        {
            using var conn = new SqlConnection(_connectionString);
            await conn.ExecuteAsync("spCart_UpdateCartItem",
                new { 
                    CartItemId = cartItemId,
                    Quantity = quantity },
                commandType: CommandType.StoredProcedure);
        }

        public async Task DeleteCartItem(int cartItemId)
        {
            using var conn = new SqlConnection(_connectionString);
            await conn.ExecuteAsync("spCart_DeleteCartItem",
                new { 
                    CartItemId = cartItemId },
                commandType: CommandType.StoredProcedure);
        }
    }
}
