
using EcommerceProject.Models.DTOs.Payment;
using EcommerceProject.Models.DTOs.ShoppingCart;
using EcommerceProject.Models.Entities;
using System.Data;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface ICartRepository
    {
        Task<IEnumerable<CartItemDto>> GetCartAsync(int? userId);
        Task AddToCartAsync(int? userId, int variantId, int quantity);
        Task MergeCartAsync(int guestCartId, int userId);
        Task UpdateQuantityAsync(int cartId, int quantity);
        Task RemoveCartAsync(int cartId, CancellationToken ct = default);

        Task<int> CheckoutAsync(int userId);
        Task<CheckoutsResponseDto> CheckoutSelectedItemsAsync(int userId, CheckoutsRequestDto request, IDbConnection connection, IDbTransaction transaction);
    }
}
