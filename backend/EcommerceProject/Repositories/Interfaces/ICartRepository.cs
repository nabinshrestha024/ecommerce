
using EcommerceProject.Models.DTOs.ShoppingCart;
using EcommerceProject.Models.Entities;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface ICartRepository
    {
        Task<IEnumerable<CartItemDto>> GetCartAsync(int userId);
        Task AddToCartAsync(int userId, int variantId, int quantity);
        Task UpdateQuantityAsync(int cartId, int quantity);
        Task RemoveCartAsync(int cartId);

    }
}
