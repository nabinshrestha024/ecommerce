using EcommerceProject.Models.DTOs.Cart;
using EcommerceProject.Models.DTOs.ShoppingCart;

namespace EcommerceProject.Services.Interfaces
{
    public interface ICartService
    {
        Task<IEnumerable<CartItemDto>> GetCartAsync(int userId);
        Task AddToCartAsync(int userId, int productId, int quantity);
        Task UpdateQuantityAsync(int cartItemId, int quantity);
        Task RemoveItemAsync(int cartItemId);


        Task AddToCartAsync(int userId, string productName, int quantity);
    }
}
