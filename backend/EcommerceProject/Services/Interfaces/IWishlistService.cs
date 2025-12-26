using EcommerceProject.Models.DTOs.Wishlist;

namespace EcommerceProject.Services.Interfaces
{
    public interface IWishlistService
    {
        Task<PagedResult<WishListItemDto>> GetAsync(int userId, int page, int size);
        Task AddWishlistItemAsync(int userId, int productId);
        Task DeleteWishlistItemAsync(int userId, int productId);

        Task MoveToCartAsync(int userId, int productId);
    }
}
