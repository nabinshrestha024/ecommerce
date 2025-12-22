using EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Product;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Product
{
    [Route("v1/catalog/products")]
    [ApiController]
    public class CatalogProductsController : ControllerBase
    {
        private readonly IProductService _service;

        public CatalogProductsController(IProductService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery] int? categoryId, [FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int pageSize = 10, CancellationToken ct = default)
        {
            pageSize = Math.Clamp(pageSize, 1, 100);

            var result = await _service.GetPagedAsync(categoryId, search, page, pageSize, ct);
            return Ok(result);
        }

        [HttpGet("{slugOrId}")]
        public async Task<IActionResult> GetProductDetails(string slugOrId, CancellationToken ct)
        {
            var product = await _service.GetDetailsAsync(slugOrId, ct);
            if (product is null) return NotFound(new { message = "Product not found." });
            return Ok(product);
        }
    }
}
