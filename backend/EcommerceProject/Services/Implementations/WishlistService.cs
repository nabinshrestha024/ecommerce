
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
        private readonly IUrlService _urlService;

        public WishlistService(IWishlistRepository wishlistRepository, IValidator<int> validator, IUrlService urlService)
        {
            _wishlistRepository = wishlistRepository;
            _validator = validator;
            _urlService = urlService;
        }

        public async Task<PagedResult<WishListItemDto>> GetAsync(int userId, int page, int size)
        {
            var validation = await _validator.ValidateAsync(userId);
            if(validation == null)
            {
                throw new ValidationException(validation.Errors);
            }
            var result = await _wishlistRepository.GetPagedAsync(userId, page, size);
            if (result.Items != null)
            {
                foreach (var item in result.Items)
                {
                    item.ProductImageUrl = _urlService.ToAbsoluteUrl(item.ProductImageUrl);
                }
            }
           
            return result;
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
