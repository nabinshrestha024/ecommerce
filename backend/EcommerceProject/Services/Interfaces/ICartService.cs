
using EcommerceProject.Models.DTOs.ShoppingCart;

namespace EcommerceProject.Services.Interfaces
{
    public interface ICartService
    {
        Task<IEnumerable<CartItemDto>> GetCartAsync(int? userId);
        Task UpdateQuantityAsync(int cartId, int quantity);
        Task RemoveItemAsync(int cartId);

        Task MergeCartAfterLoginAsync(int guestCartId, int userId);
        Task AddToCartAsync(int? userId, int variantId, int quantity, CancellationToken ct = default);
        Task<int> CheckoutAsync(int userId);

        Task<CheckoutsResponseDto> CheckoutSelectedItemsAsync(int userId, CheckoutsRequestDto request);

    }
}
