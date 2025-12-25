using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EcommerceProject.Controllers.v1.Wishlist
{
   
    [ApiController]
    [Route("v1/wishlist/")]
    [Authorize(Roles = "Customer, Admin")]
    
    public class WishlistController : ControllerBase
    {
        private readonly IWishlistService _wishlistService;

        
        public WishlistController(IWishlistService wishlistService)
        {
            _wishlistService = wishlistService;
        }


        [HttpGet("get")]
        public async Task<IActionResult> GetWishlist()
        {
            int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            return Ok(await _wishlistService.GetWishlistAsync(userId));
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddWishlist(int productId)
        {

            int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            await _wishlistService.AddWishlistItemAsync(userId, productId);
            return Ok("Added to wishlist");
        }
        [HttpDelete("delete")]

        public async Task<IActionResult> DeleteWishlistItem(int wishlistId)
        {
            await _wishlistService.DeleteWishlistItemAsync(wishlistId);
            return Ok("Removed From wishlist");
        }
    }
}
