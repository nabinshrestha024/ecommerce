using EcommerceProject.Models.DTOs.Cart;
using EcommerceProject.Models.DTOs.ShoppingCart;
using EcommerceProject.Models.Entities;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using EcommerceProject.utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Cart
{

    [Authorize]
    [ApiController]
    [Route("v1/cart/")]
   
    
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }


        [HttpGet("/get/cart")]

        public async Task<IActionResult> GetCart()
        {

            int userId = User.GetUserId();
            var cartItems = await _cartService.GetCartAsync(userId);
            return Ok(cartItems);
        }

        
        [HttpPost("/addcart")]

        public async Task<IActionResult> AddCart([FromBody] AddCartRequestDto request)
        {

            try
            {
                if (string.IsNullOrWhiteSpace(request.ProductName))
                {
                    return BadRequest(new { message = "Product name is required" });

                }

                if(request.Quantity <= 0)
                {
                    return BadRequest(new { message = "Quantity must be greater than 0" });

                }

                int userId = User.GetUserId();

                await _cartService.AddToCartAsync(userId, request.ProductName, request.Quantity);
                return Ok(new { message = "Product added to cart" });

            }catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            
        }

        [HttpPut("{cartitemId}")]

        public async Task<IActionResult> UpdateCartAsync(int cartItemId, [FromBody] int quantity)
        {

            await _cartService.UpdateQuantityAsync(cartItemId, quantity);
            return Ok("Card updated");

        }

        [HttpDelete("{cartitemId}")]
        public async Task<IActionResult> DeleteItem(int cartItemId)
        {
            await _cartService.RemoveItemAsync(cartItemId);
            return Ok("Item removed");
        }


    }
}
