using EcommerceProject.Models.DTOs.Wishlist;

namespace EcommerceProject.Services.Interfaces
{
    public interface IWishlistService
    {
        Task<PagedResult<WishListItemDto>> GetAsync(int userId, int page, int size, CancellationToken ct = default);
        Task AddWishlistItemAsync(int userId, int variantId, CancellationToken ct = default);
        Task DeleteWishlistItemAsync(int wishlistId);

        Task MoveToCartAsync(int wishlistId, int userId, int quantity);
    }
}
