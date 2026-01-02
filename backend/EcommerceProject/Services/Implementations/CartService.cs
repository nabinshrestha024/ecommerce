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
        private readonly IUrlService _urlService;
        private readonly IProductVariantRepository _variantrepo;
        public CartService(ICartRepository cartRepository, IProductRepository productRepository, IUrlService urlService, IProductVariantRepository variantrepo)
        {
            _cartRepository = cartRepository;
            _productRepository = productRepository;
            _urlService = urlService;
            _variantrepo = variantrepo;
        }

        public async Task<IEnumerable<CartItemDto>> GetCartAsync(int userId)
        {
            if (userId <= 0)
                throw new ArgumentException("Invalid user");

            var result = await _cartRepository.GetCartAsync(userId);
            foreach (var item in result)
            {
                item.ProductImageUrl = _urlService.ToAbsoluteUrl(item.ProductImageUrl);
            }
            return result;
        }

        public async Task AddToCartAsync(int userId, int variantId, int quantity, CancellationToken ct = default)
        {
            var exists = await _variantrepo.ExistsAsync(variantId, ct);

            if (!exists)
            {
                throw new Exception($"Product variant cannot found");

            }

            

            var cartItems = await _cartRepository.GetCartAsync(userId);

            var cartItem = cartItems.FirstOrDefault(x => x.VariantId == variantId);


            if (cartItem != null)
            {

                var totalQuantity = cartItem.Quantity + quantity;
                
                


                cartItem.Quantity = totalQuantity;

                await _cartRepository.UpdateQuantityAsync(cartItem.CartId, totalQuantity);
            }
            else
            {
                await _cartRepository.AddToCartAsync(userId, variantId, quantity);      
               
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
