using EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Product;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Product
{
    [Route("api/v1/admin/products")]
    [ApiController]
    public class AdminProductsController : ControllerBase
    {
        private readonly IProductService _service;
        public AdminProductsController(IProductService service)
        {
            _service = service;
        }
        [HttpGet]
        public async Task<ActionResult<PagedResult<ProductListItemDto>>> List([FromQuery] ProductFilterDto filter, CancellationToken ct)
        {
            var paged = await _service.CatalogListAsync(new ProductFilterDto
            {
                Page = filter.Page,
                PageSize = filter.PageSize,
                Search = filter.Search,
                CategoryID = filter.CategoryID,
                MinPrice = filter.MinPrice,
                MaxPrice = filter.MaxPrice,
                SortBy = filter.SortBy,
                SortDir = filter.SortDir,
                IsActive = filter.IsActive ?? null
            }, ct);

           
            return Ok(paged);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductDetailDto>> Get(int id, CancellationToken ct)
        {
            var dto = await _service.GetDetailAsync(id, admin: true, ct);
            return dto is null ? NotFound() : Ok(dto);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CreateProductRequest req, CancellationToken ct)
        {
            var id = await _service.CreateAsync(req, ct);
            return CreatedAtAction(nameof(Get), new { id }, new { ProductID = id });
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Update(int id, [FromBody] UpdateProductRequest req, CancellationToken ct)
        {
            var ok = await _service.UpdateAsync(id, req, ct);
            return ok ? NoContent() : NotFound();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id, CancellationToken ct)
        {
            var ok = await _service.DeleteAsync(id, ct);
            return ok ? NoContent() : NotFound();
        }
    }
}
