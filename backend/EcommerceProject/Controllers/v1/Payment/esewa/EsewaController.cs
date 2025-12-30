using EcommerceProject.Models.DTOs.EsewaPayment;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;

[ApiController]
[Route("v1/payments/esewa")]
public class EsewaController : ControllerBase
{
    private readonly IEsewaService _service;

    public EsewaController(IEsewaService service)
    {
        _service = service;
    }

    [HttpPost("initiate")]
    public async Task<IActionResult> Initiate([FromBody] EsewaInitiateRequestDto dto)
    {
        var result = await _service.InitiateEsewaPaymentAsync(dto.OrderId);
        return Ok(result);
    }

    [HttpGet("callback")]
    public async Task<IActionResult> Callback(
        [FromQuery] string data)
    {
        if (string.IsNullOrEmpty(data))
            return Redirect("/failure.html");

        try
        {
            var json = Encoding.UTF8.GetString(Convert.FromBase64String(data));
            var payload = JsonSerializer.Deserialize<EsewaVerifyResponseDto>(json);

            if (payload == null) return Redirect("/failure.html");
            var success = await _service.VerifyByStatusAsync(payload);

            return success 
                ? Redirect("/success.html") 
                : Redirect("/failure.html");
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error in Esewa Callback: " + ex.Message); // For logging purpose
            return Redirect("/failure.html");
        }
    }

    [HttpGet("status")]
    public async Task<IActionResult> Status(string transaction_uuid, decimal total_amount)
        => Ok(await _service.CheckStatusAsync(transaction_uuid, total_amount));
}
