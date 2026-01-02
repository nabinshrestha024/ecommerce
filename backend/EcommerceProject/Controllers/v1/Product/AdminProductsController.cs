using EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Product;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Product
{
    [Route("v1/admin/products")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminProductsController : ControllerBase
    {
        private readonly IProductService _service;
        private readonly IUrlService _urlService;

        public AdminProductsController(IProductService service, IUrlService urlService)
        {
            _service = service;
            _urlService = urlService;
        }
       
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create(
        [FromForm] ProductCreateDto body,
        [FromForm] IFormFileCollection? images,
        [FromForm] int? primaryIndex,
        CancellationToken ct)
        {
            var id = await _service.CreateAsync(body, images, primaryIndex, ct);
            return CreatedAtAction(nameof(GetById), new { id }, new { productId = id });
        }

        
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id, CancellationToken ct)
        {
            var product = await _service.GetDetailsAsync(id.ToString(), ct);
            if (product is null) return NotFound();
            var baseUrl = $"{Request.Scheme}://{Request.Host}";

            foreach (var img in product.Images)
            {
                img.ImageUrl = _urlService.ToAbsoluteUrl(img.ImageUrl);
            }
            return Ok(product);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] AdminProductFilterDto filter, [FromQuery] PaginationDto pagination, CancellationToken ct)
        {
            var result = await _service.AdminGetProductsAsync(filter, pagination, ct);
            var baseUrl = $"{Request.Scheme}://{Request.Host}";

            foreach (var item in result.Items)
            {
                item.PrimaryImageUrl = _urlService.ToAbsoluteUrl(item.PrimaryImageUrl);
            }
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Update(int id, [FromForm] ProductUpdateDto body, [FromForm] IFormFileCollection? images, [FromForm] int? primaryIndex, CancellationToken ct)
        {
            var ok = await _service.UpdateAsync(id, body, images, primaryIndex, ct);
            if (!ok) return NotFound(new { message = "Product not found." });
            return Ok(new { message = "Updated." });
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id, CancellationToken ct)
        {
            var ok = await _service.DeleteAsync(id, ct);
            if (!ok) return NotFound(new { message = "Product not found." });
            return Ok(new { message = "Product deactivated." });
        }
    }
}
