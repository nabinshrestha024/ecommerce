using EcommerceProject.Models.DTOs.Cart;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface ICartRepository
    {
        Task<IEnumerable<CartItemDto>> GetCart(int userId);
        Task AddCartItem(int userId, int productId, int quantity);
        Task UpdateCartItem(int cartItemId, int quantity);
        Task DeleteCartItem(int cartItemId);

    }
}
