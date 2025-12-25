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
    
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _service;

        public CategoriesController(ICategoryService service)
        {
            _service = service;
        }
        private string? ToAbsoluteUrl(string? path)
        {
            if (string.IsNullOrWhiteSpace(path))
                return path;

            if (Uri.IsWellFormedUriString(path, UriKind.Absolute))
                return path;

            if (!path.StartsWith("/"))
                path = "/" + path;

            return $"{Request.Scheme}://{Request.Host}{path}";
        }


        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] CategoryFilterDto filter, [FromQuery] PaginationDto pagination)
        {
            var result = await _service.GetCategoriesAsync(filter, pagination);
            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            foreach (var category in result.Items)
            {
                category.CategoryImageURL = ToAbsoluteUrl(category.CategoryImageURL);
            }

            return Ok(result);
        }
    }

}
