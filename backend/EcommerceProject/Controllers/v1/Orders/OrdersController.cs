using System.Security.Claims;
using EcommerceProject.Models.DTOs.Orders;
using EcommerceProject.Models.Entities;
using EcommerceProject.Services.Implementations;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Orders
{
    [Route("v1/orders")]
    [ApiController]
    [Authorize(Roles = "Admin, Customer")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IUrlService _urlService;
        public OrdersController(IOrderService orderService, IUrlService urlService  )
        {
            _orderService = orderService;
            _urlService = urlService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(
            [FromBody] CreateOrderRequestDto dto,
            CancellationToken ct)
        {
            var userIdClaim =
                User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? User.FindFirstValue("sub");

            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized("Invalid user id.");

            var result = await _orderService.CreateOrderFromCartAsync(userId, dto, ct);

            return Ok(new
            {
                message = "Order placed successfully.",
                orderId = result.OrderId,
                totalAmount = result.TotalAmount
            });
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetMyOrders(CancellationToken ct)
        {
            var userIdClaim =
                User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? User.FindFirstValue("sub");

            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized("Invalid user id.");

            var orders = await _orderService.GetMyOrdersAsync(userId, ct);

            return Ok(orders);
        }

        [HttpGet("{orderId:int}")]
        public async Task<IActionResult> GetMyOrderById(int orderId, CancellationToken ct)
        {
            var userIdClaim =
                User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? User.FindFirstValue("sub");

            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized("Invalid user id.");

            var order = await _orderService.GetMyOrderByIdAsync(userId, orderId, ct);

            if (order == null)
                return NotFound(new { message = "Order not found." });

            return Ok(order);
        }
        
        [HttpPut("{orderId:int}/cancel")]
        public async Task<IActionResult> CancelOrder(
            int orderId,
            CancellationToken ct)
        {
            var userIdClaim =
                User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? User.FindFirstValue("sub");

            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized("Invalid user id.");

            await _orderService.CancelOrderAsync(userId, orderId, ct);

            return Ok(new { message = "Order cancelled successfully." });
        }
    }
}
