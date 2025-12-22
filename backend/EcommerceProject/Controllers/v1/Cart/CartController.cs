using EcommerceProject.Models.DTOs.Cart;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Cart
{
    [ApiController]
    [Route("v1/cart/")]
    
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }


        [HttpGet("{userId}")]

        public async Task<IActionResult> GetCart(int userId)
        {
            var cartItems = await _cartService.GetCartAsync(userId);
            return Ok(cartItems);
        }

        [HttpPost("/addcart")]
        public async Task<IActionResult> AddCart([FromBody] CartItemDto item)
        {
            await _cartService.AddCartItemAsync(item.UserId, item.ProductId, item.Quantity);
            return Ok("Item added to cart");
        }

        [HttpPut("{cartitemId}")]

        public async Task<IActionResult> UpdateCartAsync(int cartItemId, [FromBody] int quantity)
        {

            await _cartService.UpdateCartItemAsync(cartItemId, quantity);
            return Ok("Card updated");

        }

        [HttpDelete("{cartitemId}")]
        public async Task<IActionResult> DeleteItem(int cartItemId)
        {
            await _cartService.DeleteCartItemAsync(cartItemId);
            return Ok("Item removed");
        }


    }
}
