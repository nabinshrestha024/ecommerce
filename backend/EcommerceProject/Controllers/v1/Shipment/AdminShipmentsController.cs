using EcommerceProject.Models.DTOs.Shipments;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Shipment
{
    [Authorize(Roles ="Admin")]
    [Route("v1/admin/shipments")]
    [ApiController]
    public class AdminShipmentsController : ControllerBase
    {
        private readonly IShipmentService _service;

        public AdminShipmentsController(IShipmentService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create(
            [FromBody] CreateShipmentDto dto,
            CancellationToken ct)
        {
            await _service.CreateShipmentAsync(dto, ct);
            return Ok(new { message = "Shipment created successfully." });
        }

        [HttpPut("{shipmentId:int}/status")]
        public async Task<IActionResult> UpdateStatus(
            int shipmentId,
            [FromBody] UpdateShipmentStatusDto dto,
            CancellationToken ct)
        {
            await _service.UpdateShipmentStatusAsync(shipmentId, dto.Status, ct);
            return Ok(new { message = "Shipment status updated." });
        }
    }
}
