using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.ShoppingCart;
using EcommerceProject.Repositories.Interfaces;
using System.Data;
using System.Text.Json;

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
            var cartDictionary = new Dictionary<int, CartItemDto>();
            var result = await connection.QueryAsync<CartItemDto, string, CartItemDto>(
                "spCart_GetCartByUser",
                (cart, AttributeJson) =>
                {
                    if (!cartDictionary.TryGetValue(cart.CartId, out var existing))
                    {
                        if (!string.IsNullOrEmpty(AttributeJson))
                        {
                            cart.Attributes = JsonSerializer.Deserialize<List<CartItemAttributeDto>>(AttributeJson) ?? new();
                        }
                        cartDictionary.Add(cart.CartId, cart);
                        return cart;
                    }
                    return existing;
                },
                new { UserId = userId },
                splitOn: "Attributes",
                commandType: CommandType.StoredProcedure);
            return cartDictionary.Values.ToList();
            
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

        public async Task<int> CheckoutAsync(int userId)
        {
            using var conn = _connectionFactory.CreateConnection();

            return await conn.ExecuteScalarAsync<int>(
                "spCart_Checkout",
                new
                {
                    UserId = userId
                },
                commandType: CommandType.StoredProcedure
            );
        }

    }
}
