using EcommerceProject.Models.DTOs.Wishlist;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IWishlistRepository
    {
        Task<IEnumerable<WishListItemDto>> GetWishlist(int userId);
     
        Task AddWishlistItem(int userId, int productId);

        Task DeleteWishlistItem(int wishlistItemId); 
    }
}
