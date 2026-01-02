using EcommerceProject.Models.DTOs.Wishlist;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IWishlistRepository
    {

        Task<PagedResult<WishListItemDto>> GetPagedAsync(int userId, int page, int size, CancellationToken ct = default);     
        Task AddWishlistItem(int userId, int variantId, CancellationToken ct = default);


        Task DeleteWishlistItem(int wishlistId);

        Task MoveToCartAsync(int wishlistId, int userId, int quantity);
    }
}
