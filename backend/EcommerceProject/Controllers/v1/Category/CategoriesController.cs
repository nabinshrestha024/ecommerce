using EcommerceProject.Models.DTOs.Category;
using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Category
{
    [ApiController]
    [Route("v1/categories")]
    [Authorize(Roles = "Admin, Customer")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _service;

        public CategoriesController(ICategoryService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] CategoryFilterDto filter, [FromQuery] PaginationDto pagination)
        {
            var result = await _service.GetCategoriesAsync(filter, pagination);
            return Ok(result);
        }
    }

}
