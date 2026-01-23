using EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Product;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Product
{
    [Route("v1/catalog/products")]
    [ApiController]
    public class CatalogProductsController : ControllerBase
    {
        private readonly IProductService _service;
        private readonly IUrlService _urlService;

        public CatalogProductsController(IProductService service, IUrlService urlService)
        {
            _service = service;
            _urlService = urlService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery] int? categoryId, [FromQuery] string? search, [FromQuery] string? categoryName, [FromQuery] List<string>? tagNames, [FromQuery] decimal? minPrice,[FromQuery] decimal? maxPrice,  [FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string sortOrder="desc", CancellationToken ct = default)
        {
            pageSize = Math.Clamp(pageSize, 1, 100);
            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            var result = await _service.GetPagedAsync(categoryId, search, categoryName, tagNames, minPrice, maxPrice, page, pageSize, sortOrder, ct);
            foreach (var item in result.Items)
            {
                if (!string.IsNullOrEmpty(item.PrimaryImageUrl))
                {
                    item.PrimaryImageUrl = _urlService.ToAbsoluteUrl(item.PrimaryImageUrl);
                }

                foreach (var img in item.Images)
                {
                    img.ImageUrl = _urlService.ToAbsoluteUrl(img.ImageUrl);
                }
            }

            return Ok(result);
        }

        [HttpGet("{slugOrId}")]
        public async Task<IActionResult> GetProductDetails(string slugOrId, CancellationToken ct)
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            var product = await _service.GetDetailsAsync(slugOrId, ct);
            if (product is null) return NotFound(new { message = "Product not found." });

            foreach (var img in product.Images)
            {
                img.ImageUrl = _urlService.ToAbsoluteUrl(img.ImageUrl);
            }

            foreach (var rp in product.RelatedProducts)
            {
                foreach (var img in rp.Images)
                {
                    img.ImageUrl = _urlService.ToAbsoluteUrl(img.ImageUrl);
                }
            }

            return Ok(product);
        }
    }
}
