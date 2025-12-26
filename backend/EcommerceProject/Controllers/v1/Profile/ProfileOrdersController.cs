using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers
{
    [ApiController]
    [Authorize]
    [Route("v1/profile/orders")]
    public class ProfileOrdersController : ControllerBase
    {
        private readonly IUserProfileService _service;

        public ProfileOrdersController(IUserProfileService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetMyOrders()
        {
            var orders = await _service.GetMyOrdersAsync();
            return Ok(orders);
        }

        [HttpGet("{orderId:int}")]
        public async Task<IActionResult> GetOrderDetails(int orderId)
        {
            var order = await _service.GetOrderDetailsAsync(orderId);

            if (order == null)
                return NotFound(new { message = "Order not found or access denied." });

            return Ok(order);
        }
    }
}
