
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
        private readonly IProductVariantRepository _variantrepo;

        public WishlistService(IWishlistRepository wishlistRepository, IValidator<int> validator, IUrlService urlService, IProductVariantRepository variantrepo)
        {
            _wishlistRepository = wishlistRepository;
            _validator = validator;
            _urlService = urlService;
            _variantrepo = variantrepo;
        }

        public async Task<PagedResult<WishListItemDto>> GetAsync(int userId, int page, int size, CancellationToken ct = default)
        {
            var validation = await _validator.ValidateAsync(userId);
            if(validation == null)
            {
                throw new ValidationException(validation.Errors);
            }
            var result = await _wishlistRepository.GetPagedAsync(userId, page, size, ct);
            if (result.Items != null)
            {
                foreach (var item in result.Items)
                {
                    item.ProductImageUrl = _urlService.ToAbsoluteUrl(item.ProductImageUrl);
                }
            }
           
            return result;
        }

        public async Task AddWishlistItemAsync(int userId, int variantId, CancellationToken ct = default)
        {
            if(userId <= 0)
            {
                throw new ArgumentException("Invalid user ID.", nameof(userId));
            }

            if(variantId <= 0)
            {
                throw new ArgumentException("Invalid variant ID.", nameof(variantId));
            }


            var exists = await _variantrepo.ExistsAsync(variantId, ct);
            if (!exists)
            {
                throw new ArgumentException("Product variant not found or inactive");

            }


            await _wishlistRepository.AddWishlistItem(userId, variantId, ct);
        }

        public async Task DeleteWishlistItemAsync(int wishlistId)
        {
            await _wishlistRepository.DeleteWishlistItem(wishlistId);
        }

        public async Task MoveToCartAsync(int wishlistId, int userId, int quantity = 1)
        {
            await _wishlistRepository.MoveToCartAsync(wishlistId, userId, quantity);

        }
    }
}
