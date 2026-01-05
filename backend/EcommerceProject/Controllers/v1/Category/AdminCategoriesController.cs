using EcommerceProject.Models.DTOs.Category;
using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Category
{
    [ApiController]
    [Route("v1/admin/categories")]
    [Authorize(Roles = "Admin")]
    public class AdminCategoriesController : ControllerBase
    {
        private readonly ICategoryService _service;
        private readonly IUrlService _urlService;
        private readonly IFileStorageService _fileStorage;

        public AdminCategoriesController(ICategoryService service, IUrlService urlService, IFileStorageService fileStorage)
        {
            _service = service;
            _urlService = urlService;
            _fileStorage = fileStorage;

        }
      

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] AdminCategoryFilterDto filter, [FromQuery] PaginationDto pagination)
        {
            var result = await _service.AdminGetCategoriesAsync(filter, pagination);
            var baseUrl = $"{Request.Scheme}://{Request.Host}";

            foreach (var category in result.Items)
            {
                category.CategoryImageURL = _urlService.ToAbsoluteUrl(category.CategoryImageURL);
            }
            return Ok(result);
        }
        [HttpPost("upload-image")]
        public async Task<IActionResult> UploadImage(IFormFile file, CancellationToken ct)
        {
            if (file == null)
                return BadRequest("No file uploaded");

            var imageUrl = await _fileStorage.SaveCategoryImageAsync(file, ct);

            return Ok(new { imageUrl });
        }


        [HttpPost]
        public async Task<IActionResult> Create(CategoryUpsertDto dto, CancellationToken ct)
        {
            var id = await _service.CreateAsync(dto, ct);
            
            return CreatedAtAction(nameof(Create), new { id }, null);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, CategoryUpsertDto dto, CancellationToken ct)
        {
            await _service.UpdateAsync(id, dto, ct);
            return Ok("Update Successful");
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);


            if (!deleted)
                return NotFound(new { message = "Category not found or already inactive." });

            return Ok(new { message = "Category deactivated successfully." });
        }
    }

}
