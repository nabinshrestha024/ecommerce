using EcommerceProject.Models.DTOs.Tags;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Tag
{
    [Route("v1/admin/tags")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminTagsController : ControllerBase
    {
        private readonly ITagService _service;

        public AdminTagsController(ITagService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateTagDto dto, CancellationToken ct)
        {
            var id = await _service.CreateAsync(dto, ct);
            return Ok(new { tagId = id });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken ct)
        {
            return Ok(await _service.GetAllAsync(ct));
        }
    }

}
