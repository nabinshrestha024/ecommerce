using EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Product;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Product
{
    [Route("api/v1/catalog/products")]
    [ApiController]
    public class CatalogProductsController : ControllerBase
    {
        private readonly IProductService _service;

        public CatalogProductsController(IProductService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<PagedResult<ProductListItemDto>>> List([FromQuery] ProductFilterDto filter, CancellationToken ct)
        {
            return Ok(await _service.CatalogListAsync(filter, ct));
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductDetailDto>> Get(int id, CancellationToken ct)
        {
            var dto = await _service.GetDetailAsync(id, admin: false, ct);
            return dto is null ? NotFound() : Ok(dto);
        }
    }
}
