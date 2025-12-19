using EcommerceProject.Models.DTOs.Category;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Category
{
    [ApiController]
    [Route("v1/categories")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _service;

        public CategoriesController(ICategoryService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] CategoryFilterDto filter)
        {
            var result = await _service.GetCategoriesAsync(filter);
            return Ok(result);
        }
    }

}
