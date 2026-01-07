using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Tag
{
    [Route("v1/tags")]
    [ApiController]
    public class ProductTagsController : ControllerBase
    {
        private readonly ITagService _service;
        public ProductTagsController(ITagService tagService)
        {
            _service = tagService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken ct)
        {
            return Ok(await _service.GetAllAsync(ct));
        }
    }
}
