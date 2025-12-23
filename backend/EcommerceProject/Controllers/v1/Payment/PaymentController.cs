using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("v1/payments/esewa")]
public class PaymentController : ControllerBase
{
    private readonly IPaymentService _service;

    public PaymentController(IPaymentService service)
    {
        _service = service;
    }

    [HttpGet("success")]
    public IActionResult Success(int oid, string refId)
    {
        _service.EsewaSuccess(oid, refId, refId);
        return Ok("Payment Success");
    }

    [HttpGet("failure")]
    public IActionResult Failure(int oid)
    {
        _service.EsewaFailure(oid);
        return Ok("Payment Failed");
    }
}
