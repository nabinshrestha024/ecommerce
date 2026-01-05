using EcommerceProject.Models.DTOs.Product;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Product
{
    [Route("v1/admin/products/{productId:int}/variants")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminProductVariantsController : ControllerBase
    {
        private readonly IProductVariantService _service;

        public AdminProductVariantsController(IProductVariantService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create(
            int productId,
            [FromBody] ProductVariantCreateDto dto,
            CancellationToken ct)
        {
            var id = await _service.CreateAsync(productId, dto, ct);
            return Ok(new { message = "Variant created successfully.", variantId = id });
        }

        [HttpPut("{variantId:int}")]
        public async Task<IActionResult> Update(
            int variantId,
            [FromBody] ProductVariantUpdateDto dto,
            CancellationToken ct
        )
        {
            var ok = await _service.UpdateAsync(variantId, dto, ct);
            if (!ok) return NotFound();
            return Ok(new { message = "Variant updated." });
        }

        [HttpPut("{variantId:int}/set-default")]
        public async Task<IActionResult> SetDefault(int variantId, CancellationToken ct)
        {
            var ok = await _service.SetDefaultAsync(variantId, ct);
            if (!ok) return BadRequest();
            return Ok(new { message = "Default variant set." });
        }

        [HttpDelete("{variantId:int}")]
        public async Task<IActionResult> Delete(int variantId, CancellationToken ct)
        {
            var ok = await _service.DeleteAsync(variantId, ct);
            if (!ok) return BadRequest();
            return Ok(new { message = "Variant deleted." });
        }
    }
}
