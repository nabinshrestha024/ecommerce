using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Wishlist
{
    [Route("v1/wishlist")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private readonly IWishlistService _wishlistService;

        
        public WishlistController(IWishlistService wishlistService)
        {
            _wishlistService = wishlistService;
        }


        [HttpGet("{userId}")]
        public async Task<IActionResult> GetWishlist(int userId)
        {
            var wishlistItems = await _wishlistService.GetWishlistAsync(userId);
            return Ok(wishlistItems);
        }

        [HttpPost("addwishlist")]
        public async Task<IActionResult> AddWishlist(int userId, int productId)
        {
            await _wishlistService.AddWishlistItemAsync(userId, productId);
            return Ok();
        }
        [HttpDelete("deletewishlist/{wishlistItemId}")]

        public async Task<IActionResult> DeleteWishlistItem(int wishlistItemId)
        {
            await _wishlistService.DeleteWishlistItemAsync(wishlistItemId);
            return Ok();
        }
    }
}
