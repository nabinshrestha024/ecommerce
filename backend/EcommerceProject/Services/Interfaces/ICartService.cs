using EcommerceProject.Models.DTOs.Cart;
using EcommerceProject.Models.DTOs.ShoppingCart;

namespace EcommerceProject.Services.Interfaces
{
    public interface ICartService
    {
        Task<IEnumerable<CartItemDto>> GetCartAsync(int userId);
        Task UpdateQuantityAsync(int cartId, int quantity);
        Task RemoveItemAsync(int cartId);


        Task AddToCartAsync(int userId, int variantId, int quantity, CancellationToken ct = default);
    }
}
