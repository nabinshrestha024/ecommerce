using EcommerceProject.Models.DTOs.Cart;

namespace EcommerceProject.Services.Interfaces
{
    public interface ICartService
    {
        Task<IEnumerable<CartItemDto>> GetCartAsync(int userId);
        Task AddCartItemAsync(int userId, int productId, int quantity);
        Task UpdateCartItemAsync(int cartItemId, int quantity);
        Task DeleteCartItemAsync(int cartItemId);
    }
}
