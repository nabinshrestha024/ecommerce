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
    [Authorize(Roles = "Customer, Admin")]

    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }


        [HttpGet("get")]

        public async Task<IActionResult> GetCart()
        {

            int userId = User.GetUserId();
            var cartItems = await _cartService.GetCartAsync(userId);
            return Ok(cartItems);
        }

        
        [HttpPost("add")]

        public async Task<IActionResult> AddCart([FromBody] AddCartRequestDto request)
        {


            try
            {
                if (request.ProductId <=0)
                {
                    return BadRequest(new { message = " VALID ProductId is required" });

                }

                if(request.Quantity <= 0)
                {
                    return BadRequest(new { message = "Quantity must be greater than 0" });

                }

                int userId = User.GetUserId();

                await _cartService.AddToCartAsync(userId, request.ProductId, request.Quantity);
                return Ok(new { message = "Product added to cart" });

            }catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            
        }

        [HttpPut("Update")]

        public async Task<IActionResult> UpdateCartAsync(int cartId, [FromBody] UpdateCartDto request)
        {

            await _cartService.UpdateQuantityAsync(cartId, request.Quantity);
            return Ok(new { message = "Card updated" });

        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteItem(int cartId)
        {
            await _cartService.RemoveItemAsync(cartId);
            return Ok("Item removed");
        }


    }
}
