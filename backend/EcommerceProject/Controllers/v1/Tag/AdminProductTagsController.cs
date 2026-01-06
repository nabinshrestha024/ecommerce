using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Tag
{
    [Route("v1/admin/products/{productId:int}/tags")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminProductTagsController : ControllerBase
    {
        private readonly ITagService _service;

        public AdminProductTagsController(ITagService service)
        {
            _service = service;
        }
        [HttpGet]
        public async Task<IActionResult> GetByProduct(int productId, CancellationToken ct)
        {
            return Ok(await _service.GetByProductIdAsync(productId, ct));
        }

        [HttpPost("{tagId:int}")]
        public async Task<IActionResult> Add(int productId, int tagId, CancellationToken ct)
        {
            await _service.AddToProductAsync(productId, tagId, ct);
            return Ok("Tag added successfully");
        }

        [HttpDelete("{tagId:int}")]
        public async Task<IActionResult> Remove(int productId, int tagId, CancellationToken ct)
        {
            await _service.RemoveFromProductAsync(productId, tagId, ct);
            return Ok("Tag removed successfully.");
        }
    }

}
