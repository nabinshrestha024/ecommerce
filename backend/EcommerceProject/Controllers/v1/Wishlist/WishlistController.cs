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


        [HttpGet]
        public async Task<IActionResult> Get(int page = 1, int size = 10)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            return Ok(await _wishlistService.GetAsync(userId, page, size));
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddWishlist(int productId)
        {

            int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            await _wishlistService.AddWishlistItemAsync(userId, productId);
            return Ok("Added to wishlist");
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteWishlistItem(int productId)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            await _wishlistService.DeleteWishlistItemAsync(userId, productId);
            return Ok("Removed From wishlist");
        }


        [HttpPost("move_to_cart")]
        public async Task<IActionResult> MoveToCart(int productId)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            await _wishlistService.MoveToCartAsync(userId, productId);
            return Ok(new { message = " moved TO Cart" });
        }
    }
}
