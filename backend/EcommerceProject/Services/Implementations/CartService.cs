using EcommerceProject.Models.DTOs.Cart;
using EcommerceProject.Models.DTOs.ShoppingCart;
using EcommerceProject.Repositories.Implementations;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;

namespace EcommerceProject.Services.Implementations
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;

        public CartService(ICartRepository cartRepository, IProductRepository productRepository )
        {
            _cartRepository = cartRepository;
        }

        public async Task<IEnumerable<CartItemDto>> GetCartAsync(int userId)
        {
            if (userId <= 0)
                throw new ArgumentException("Invalid user");

            return await _cartRepository.GetCartAsync(userId);
        }

        public async Task AddToCartAsync(int userId, int productId, int quantity)
        {
            if(quantity <= 0)
            {
                throw new ArgumentException("Quantity must be greater than zero.");
            }
            await _cartRepository.AddToCartAsync(userId, productId, quantity);
        }

        public async Task UpdateQuantityAsync(int cartItemId, int quantity)
        {
            if (quantity <= 0)
            {
                throw new ArgumentException("Quantity must be greater than zero.");
            }
            await _cartRepository.UpdateQuantityAsync(cartItemId, quantity);
        }

        public async Task RemoveItemAsync(int cartItemId)
        {
            await _cartRepository.RemoveCartAsync(cartItemId);
        }

        public async Task AddToCartAsync(int userId, string productName, int quantity)
        {
            

            int? productId = await _productRepository.GetProductIdByNameAsync(productName);

            if (productId == null)
                throw new Exception($"Product '{productName}' not found");

            await _cartRepository.AddToCartAsync(userId, productId.Value, quantity);
        }

    }
}
