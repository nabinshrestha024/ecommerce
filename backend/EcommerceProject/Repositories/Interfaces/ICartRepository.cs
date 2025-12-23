
using EcommerceProject.Models.DTOs.ShoppingCart;
using EcommerceProject.Models.Entities;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface ICartRepository
    {
        Task<IEnumerable<CartItemDto>> GetCartAsync(int userId);
        Task AddToCartAsync(int userId, int productId, int quantity);
        Task UpdateQuantityAsync(int cartItemId, int quantity);
        Task RemoveCartAsync(int cartItemId);

    }
}
