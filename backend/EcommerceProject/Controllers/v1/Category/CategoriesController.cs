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
        private readonly IUrlService _urlService;

        public CategoriesController(ICategoryService service, IUrlService urlService)
        {
            _service = service;
            _urlService = urlService;
        }
       


        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] CategoryFilterDto filter, [FromQuery] PaginationDto pagination)
        {
            var result = await _service.GetCategoriesAsync(filter, pagination);
            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            foreach (var category in result.Items)
            {
                category.CategoryImageURL = _urlService.ToAbsoluteUrl(category.CategoryImageURL);
            }

            return Ok(result);
        }
    }

}
