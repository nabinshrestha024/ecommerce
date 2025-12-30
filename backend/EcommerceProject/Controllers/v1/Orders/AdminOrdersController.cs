using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Models.DTOs.Orders;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Orders
{
    [Route("v1/admin/orders")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminOrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IUrlService _urlService;

        public AdminOrdersController(IOrderService orderService, IUrlService urlService)
        {
            _orderService = orderService;
            _urlService = urlService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] PaginationDto pagination, [FromQuery] string? status, [FromQuery] string? search, CancellationToken ct)
        {
            var result = await _orderService.AdminGetOrdersAsync(
                pagination,
                status,
                search,
                ct);
            
            return Ok(result);
           
        }

        [HttpGet("{orderId:int}")]
        public async Task<IActionResult> GetById(int orderId, CancellationToken ct)
        {
            var order = await _orderService.AdminGetOrderByIdAsync(orderId, ct);
            var baseUrl = $"{Request.Scheme}://{Request.Host}";

            foreach (var item in order.Items)
            {
                item.ProductImageUrl = _urlService.ToAbsoluteUrl(item.ProductImageUrl);
            }

            if (order == null)
                return NotFound(new { message = "Order not found." });

            return Ok(order);
        }

        [HttpPut("{orderId:int}/status")]
        public async Task<IActionResult> UpdateStatus(int orderId, [FromBody] UpdateOrderStatusDto dto, CancellationToken ct)
        {
            if (string.IsNullOrWhiteSpace(dto.Status))
                return BadRequest(new { message = "Status is required." });

            await _orderService.AdminUpdateStatusAsync(orderId, dto.Status, ct);

            return Ok(new { message = "Order status updated successfully." });
        }
    }
}
