
using EcommerceProject.Models.DTOs.Orders;
using EcommerceProject.Models.DTOs.ShoppingCart;
using EcommerceProject.Services.Interfaces;
using EcommerceProject.utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EcommerceProject.Controllers.v1.Cart
{
    [ApiController]
    [Route("v1/cart/")]
    [Authorize(Roles = "Customer, Admin")]

    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
        private readonly IOrderService _orderService;

        public CartController(ICartService cartService, IOrderService orderService)
        {
            _cartService = cartService;
            _orderService = orderService;
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
                if (request.VariantId <=0)
                {
                    return BadRequest(new { message = " VALID ProductId is required" });

                }

                if(request.Quantity <= 0)
                {
                    return BadRequest(new { message = "Quantity must be greater than 0" });

                }

                int userId = User.GetUserId();

                await _cartService.AddToCartAsync(userId, request.VariantId, request.Quantity);
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

        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout([FromBody] CreateOrderRequestDto dto, CancellationToken ct)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);


            var (orderId, totalAmount)= await _orderService.CreateOrderFromCartAsync(userId,dto,ct);

            return Ok(new
            {
                message = "Checkout successful. Order created.",
                orderId,
                totalAmount
            });
        }

        [HttpPost("checkout-selected-items")]
        public async Task<IActionResult> CheckoutSelectedItems([FromBody] CheckoutsRequestDto request)
        {
            try
            {
                // Get user ID from JWT claims
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

                if (userIdClaim == null)
                {
                    return Unauthorized(new { message = "User not found in token." });

                }
                    

                int userId = int.Parse(userIdClaim.Value);

                var result = await _cartService.CheckoutSelectedItemsAsync(userId, request);
                return Ok(new
                {
                    message = "Order placed successfully",
                    orderId = result.OrderId,
                    totalAmount = result.TotalAmount
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
