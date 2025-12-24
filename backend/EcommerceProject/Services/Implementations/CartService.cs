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
            _productRepository = productRepository;
        }

        public async Task<IEnumerable<CartItemDto>> GetCartAsync(int userId)
        {
            if (userId <= 0)
                throw new ArgumentException("Invalid user");

            return await _cartRepository.GetCartAsync(userId);
        }

        public async Task AddToCartAsync(int userId, string productName, int quantity)
        {
            int? productId = await _productRepository.GetProductIdByNameAsync(productName);

            if(productId == null)
            {
                throw new Exception($"Product'{productName}' not found");


            }
            await _cartRepository.AddToCartAsync(userId, productId.Value, quantity);
        }

        public async Task UpdateQuantityAsync(int cartId, int quantity)
        {
            if (quantity <= 0)
            {
                throw new ArgumentException("Quantity must be greater than zero.");
            }
            await _cartRepository.UpdateQuantityAsync(cartId, quantity);
        }

        public async Task RemoveItemAsync(int cartId)
        {
            await _cartRepository.RemoveCartAsync(cartId);
        }

    }
}
