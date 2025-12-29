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

        public async Task AddToCartAsync(int userId, int productId, int quantity, CancellationToken ct = default)
        {
            var product = await _productRepository.GetByIdAsync(productId, ct);

            if (product == null)
            {
                throw new Exception($"Product cannot found");

            }

            if(quantity > product.StockQuantity)
            {
                throw new Exception($"Only{product.StockQuantity} item avaiable in stock");

            }

            var cartItems = await _cartRepository.GetCartAsync(userId);

            var cartItem = cartItems.FirstOrDefault(x => x.ProductId == productId);


            if (cartItem != null)
            {

                var totalQuantity = cartItem.Quantity + quantity;
                
                if(totalQuantity > product.StockQuantity)
                {
                    throw new Exception($"Connot add more than {product.StockQuantity} items(s) to cart");
                }


                cartItem.Quantity = totalQuantity;

                await _cartRepository.UpdateQuantityAsync(cartItem.CartId, totalQuantity);
            }
            else
            {
                await _cartRepository.AddToCartAsync(userId, productId, quantity);      
               
            }

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
