using EcommerceProject.Models.DTOs.Payment;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("v1/checkout")]
public class CheckoutController : ControllerBase
{
    private readonly ICheckoutService _service;

    public CheckoutController(ICheckoutService service)
    {
        _service = service;
    }

    [HttpPost]
    public IActionResult Checkout([FromBody] CheckoutRequestDto dto)
    {
        int userId = 3;
        return Ok(_service.Checkout(userId, dto));
    }
}

