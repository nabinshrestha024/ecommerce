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

        public async Task<ShoppingCartResponseDto> GetCartAsync(int userId)
        {
            var item = await _cartRepository.GetCartAsync(userId);
            decimal subTotal = item.Sum(i => i.Price * i.Quantity);

            decimal discount = subTotal >= 10000 ? subTotal * 0.10m : 0m;

            return new ShoppingCartResponseDto
            {
                Items = item,
                SubTotal = subTotal,
                Discount = discount,
                GrandTotal = subTotal - discount
            };
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
    }
}
