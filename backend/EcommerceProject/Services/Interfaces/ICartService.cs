using EcommerceProject.Models.DTOs.Cart;

namespace EcommerceProject.Services.Interfaces
{
    public interface ICartService
    {
        Task<ShoppingCartResponseDto> GetCartAsync(int userId);
        Task AddToCartAsync(int userId, int productId, int quantity);
        Task UpdateQuantityAsync(int cartItemId, int quantity);
        Task RemoveItemAsync(int cartItemId);
    }
}
