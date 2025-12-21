using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("v1/profile/orders")]
public class OrdersController : ControllerBase
{
    private readonly IUserProfileService _service;

    public OrdersController(IUserProfileService service)
    {
        _service = service;
    }

    [HttpGet("{userId:int}")]
    public async Task<IActionResult> GetMyOrders(int userId)
        => Ok(await _service.GetUserOrdersAsync(userId));

    [HttpGet("{userId:int}/{orderId:int}")]
    public async Task<IActionResult> GetOrderDetails(int userId, int orderId)
        => Ok(await _service.GetOrderDetailsAsync(userId, orderId));
}
