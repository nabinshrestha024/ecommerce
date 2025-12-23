using EcommerceProject.Services.Interfaces;
using EcommerceProject.Services.Implementations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("v1/profile/orders")]
public class ProfileOrdersController : ControllerBase
{
    private readonly IUserProfileService _service;

    public ProfileOrdersController(IUserProfileService service)
    {
        _service = service;
    }

    [HttpGet("{userId:int}")]
    public async Task<IActionResult> GetUserOrders(int userId)
    {
        var orders = await _service.GetUserOrdersAsync(userId);
        
        return orders == null ? NotFound(new { message = "User not found." }) : Ok(orders);
    }


    [HttpGet("{userId:int}/{orderId:int}")]
    public async Task<IActionResult> GetOrderDetails(int userId, int orderId)
    {
        var order = await _service.GetOrderDetailsAsync(userId, orderId);
    
        if (order == null) 
        return NotFound(new { message = "Order not found or access denied." });

        return Ok(order);
    }
}
