
using EcommerceProject.Models.DTOs.Wishlist;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using FluentValidation;

namespace EcommerceProject.Services.Implementations
{
    public class WishlistService : IWishlistService
    {
        private readonly IWishlistRepository _wishlistRepository;
        private readonly IValidator<int> _validator;

        public WishlistService(IWishlistRepository wishlistRepository, IValidator<int> validator)
        {
            _wishlistRepository = wishlistRepository;
            _validator = validator;
        }

        public async Task<IEnumerable<WishListItemDto>> GetWishlistAsync(int userId)
        {
            var validation = await _validator.ValidateAsync(userId);
            if(validation == null)
            {
                throw new ValidationException(validation.Errors);
            }
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
