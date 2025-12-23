using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Shipment
{
    [Route("v1/shipments")]
    [ApiController]
    public class ShipmentsController : ControllerBase
    {
        private readonly IShipmentService _service;

        public ShipmentsController(IShipmentService service)
        {
            _service = service;
        }

        [HttpGet("order/{orderId:int}")]
        public async Task<IActionResult> GetByOrderId(int orderId, CancellationToken ct)
        {
            var shipment = await _service.GetShipmentByOrderIdAsync(orderId, ct);
            if (shipment == null)
                return NotFound(new { message = "Shipment not found." });

            return Ok(shipment);
        }
    }
}
