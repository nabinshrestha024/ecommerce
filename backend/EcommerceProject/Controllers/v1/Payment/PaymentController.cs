using EcommerceProject.Models.DTOs.Payment;
using EcommerceProject.Services.Implementations;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;



[ApiController]
[Route("api/payments/esewa")]
public class EsewaController : ControllerBase
{
    private readonly PaymentService _service;

    public EsewaController(PaymentService service)
    {
        _service = service;
    }

    [HttpPost("initiate")]
    public IActionResult Initiate(EsewaInitiatePaymentRequestDto dto)
    {
        return Ok(_service.InitiateEsewaPayment(dto.OrderId, dto.Amount));
    }

    [HttpPost("success")]
    public async Task<IActionResult> Success([FromForm] string data)
    {
        var json = Encoding.UTF8.GetString(Convert.FromBase64String(data));
        var cb = JsonConvert.DeserializeObject<EsewaCallbackResponseDto>(json);

        await _service.HandleEsewaSuccessAsync(cb);
        return Ok("Payment successful");
    }

    [HttpPost("failure")]
    public async Task<IActionResult> Failure([FromForm] string transaction_uuid)
    {
        await _service.HandleEsewaFailureAsync(transaction_uuid);
        return Ok("Payment failed");
    }
}
