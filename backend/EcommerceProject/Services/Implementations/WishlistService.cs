
using EcommerceProject.Models.DTOs.Wishlist;
using EcommerceProject.Models.Entities;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using FluentValidation;
using System.Security.Claims;

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

        public async Task<PagedResult<WishListItemDto>> GetAsync(int userId, int page, int size)
        {
            var validation = await _validator.ValidateAsync(userId);
            if(validation == null)
            {
                throw new ValidationException(validation.Errors);
            }
            return await _wishlistRepository.GetPagedAsync(userId, page, size);
        }

        public async Task AddWishlistItemAsync(int userId, int productId)
        {
            await _wishlistRepository.AddWishlistItem(userId, productId);
        }

        public async Task DeleteWishlistItemAsync(int userId, int productId)
        {
            await _wishlistRepository.DeleteWishlistItem(userId, productId);
        }

        public async Task MoveToCartAsync(int userId, int productId)
        {
            await _wishlistRepository.MoveToCartAsync(userId, productId);

        }
    }
}
