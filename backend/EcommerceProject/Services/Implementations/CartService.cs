using EcommerceProject.Models.DTOs.Cart;
using EcommerceProject.Repositories.Implementations;
using EcommerceProject.Services.Interfaces;

namespace EcommerceProject.Services.Implementations
{
    public class CartService : ICartService
    {
        private readonly CartRepository _cartRepository;

        public CartService(CartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        public async Task<IEnumerable<CartItemDto>> GetCartAsync(int userId)
        {
            var item = await _cartRepository.GetCart(userId);
            return item;
        }

        public async Task AddCartItemAsync(int userId, int productId, int quantity)
        {
            if(quantity <= 0)
            {
                throw new ArgumentException("Quantity must be greater than zero.");
            }
            await _cartRepository.AddCartItem(userId, productId, quantity);
        }

        public async Task UpdateCartItemAsync(int cartItemId, int quantity)
        {
            if (quantity <= 0)
            {
                throw new ArgumentException("Quantity must be greater than zero.");
            }
            await _cartRepository.UpdateCartItem(cartItemId, quantity);
        }

        public async Task DeleteCartItemAsync(int cartItemId)
        {
            await _cartRepository.DeleteCartItem(cartItemId);
        }
    }
}
