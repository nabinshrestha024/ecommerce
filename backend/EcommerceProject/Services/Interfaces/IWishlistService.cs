using EcommerceProject.Models.DTOs.Wishlist;

namespace EcommerceProject.Services.Interfaces
{
    public interface IWishlistService
    {
        Task<IEnumerable<WishListItemDto>> GetWishlistAsync(int userId);
        Task AddWishlistItemAsync(int userId, int productId);
        Task DeleteWishlistItemAsync(int wishlistItemId);
    }
}
