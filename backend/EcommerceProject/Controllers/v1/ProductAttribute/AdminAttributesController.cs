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
        public async Task<IActionResult> Create(CreateAttributeDto dto, CancellationToken ct)
        {
            var id = await _service.CreateAsync(dto, ct);
            return Ok(new { attributeId = id });
        }

        [HttpPost("{attributeId:int}/values")]
        public async Task<IActionResult> CreateValue(
            int attributeId,
            CreateAttributeValueDto dto,
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
    }

}
