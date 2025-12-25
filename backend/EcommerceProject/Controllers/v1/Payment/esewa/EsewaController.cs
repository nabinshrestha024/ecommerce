using EcommerceProject.Models.DTOs.EsewaPayment;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;

[ApiController]
[Route("v1/payments/esewa")]
public class PaymentEsewaController : ControllerBase
{
    private readonly IEsewaService _service;

    public PaymentEsewaController(IEsewaService service)
    {
        _service = service;
    }

    [HttpPost("initiate")]
    public async Task<IActionResult> Initiate(EsewaInitiateRequestDto dto)
    {
        if (dto == null || dto.OrderId <= 0)
            return BadRequest("Invalid OrderId.");

        var response = await _service.InitiateAsync(dto.OrderId);
        return Ok(response);
    }


    [HttpGet("verify/success")]
    public async Task<IActionResult> Success([FromQuery] string data)
    {
        if (string.IsNullOrEmpty(data))
            return Redirect("/failure.html");

        try
        {
            var json = Encoding.UTF8.GetString(Convert.FromBase64String(data));

            var payload = JsonSerializer.Deserialize<EsewaVerifyResponseDto>(json);

            if (payload == null)
                return Redirect("/failure.html");

            Console.WriteLine("Esewa Success Payload: " + JsonSerializer.Serialize(payload));
            var success = await _service.FinalizeEsewaPaymentAsync(payload);

            return success
                ? Redirect("/success.html")
                : Redirect("/failure.html");
        }
        catch
        {
            return Redirect("/failure.html");
        }
    }

    [HttpGet("checkstatus")]
    public async Task<IActionResult> CheckStatus(
        [FromQuery] string transaction_uuid,
        [FromQuery] decimal total_amount)
    {
        if (string.IsNullOrEmpty(transaction_uuid) || total_amount <= 0)
            return BadRequest("Invalid transaction_uuid or total_amount.");

        var status = await _service.CheckStatusAsync(transaction_uuid, total_amount);
        return Ok(status);
    }

    [HttpGet("failure")]
    public IActionResult Failure() => Redirect("/failure.html");
}

