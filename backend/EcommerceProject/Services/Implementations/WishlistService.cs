
using EcommerceProject.Models.DTOs.Wishlist;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;

namespace EcommerceProject.Services.Implementations
{
    public class WishlistService : IWishlistService
    {
        private readonly IWishlistRepository _wishlistRepository;

        public async Task<IEnumerable<WishListItemDto>> GetWishlistAsync(int userId)
        {
            return await _wishlistRepository.GetWishlist(userId);
        }

        public async Task AddWishlistItemAsync(int userId, int productId)
        {
            await _wishlistRepository.AddWishlistItem(userId, productId);
        }

        public async Task DeleteWishlistItemAsync(int wishlishItemId)
        {
            await _wishlistRepository.DeleteWishlistItem(wishlishItemId);
        }
    }
}
