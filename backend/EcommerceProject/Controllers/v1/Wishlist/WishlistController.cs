using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EcommerceProject.Controllers.v1.Wishlist
{
    [Route("v1/wishlist")]
    [ApiController]
    [Authorize]
    public class WishlistController : ControllerBase
    {
        private readonly IWishlistService _wishlistService;

        
        public WishlistController(IWishlistService wishlistService)
        {
            _wishlistService = wishlistService;
        }


        [HttpGet("/get")]
        public async Task<IActionResult> GetWishlist()
        {
            int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            return Ok(await _wishlistService.GetWishlistAsync(userId));
        }

        [HttpPost("/addwishlist")]
        public async Task<IActionResult> AddWishlist(int productId)
        {

            int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            await _wishlistService.AddWishlistItemAsync(userId, productId);
            return Ok("Added to wishlist");
        }
        [HttpDelete("/deletewishlist")]

        public async Task<IActionResult> DeleteWishlistItem(int wishlistItemId)
        {
            await _wishlistService.DeleteWishlistItemAsync(wishlistItemId);
            return Ok("Removed From wishlist");
        }
    }
}
