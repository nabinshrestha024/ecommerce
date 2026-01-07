using EcommerceProject.Models.DTOs.ProductAttribute;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.ProductAttribute
{
    [Route("v1/admin/attributes")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminAttributesController : ControllerBase
    {
        private readonly IProductAttributeService _service;

        public AdminAttributesController(IProductAttributeService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create(UpsertAttributeDto dto, CancellationToken ct)
        {
            var id = await _service.CreateAttributeAsync(dto, ct);
            return Ok(new { attributeId = id });
        }

        [HttpPost("{attributeId:int}/values")]
        public async Task<IActionResult> CreateValue(
            int attributeId,
            UpsertAttributeValueDto dto,
            CancellationToken ct)
        {
            var id = await _service.CreateValueAsync(attributeId, dto.Value, ct);
            return Ok(new { attributeValueId = id });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken ct)
        {
            return Ok(await _service.GetAllAsync(ct));
        }

        [HttpPut("{attributeId:int}")]
        public async Task<IActionResult> UpdateAttribute(int attributeId, UpsertAttributeDto dto, CancellationToken ct)
        {
            var updated = await _service.UpdateAttributeAsync(attributeId, dto, ct);
            if (!updated) return NotFound();

            return Ok("Attribute name updated.");
        }

        [HttpPut("values/{attributeValueId:int}")]
        public async Task<IActionResult> UpdateAttributeValue(
            int attributeValueId,
            UpsertAttributeValueDto dto,
            CancellationToken ct)
        {
            var updated = await _service.UpdateValueAsync(attributeValueId, dto.Value, ct);
            if (!updated) return NotFound();

            return Ok("Attribute Value Updated.");
        }

    }
}
