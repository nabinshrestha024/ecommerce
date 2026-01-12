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



        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create([FromForm] CategoryUpsertRequest request, CancellationToken ct)
        {
            var dto = new CategoryUpsertDto
            {
                Name = request.Name,
                Description = request.Description,
                IsFeatured = request.IsFeatured,
                SortOrder = request.SortOrder,
                IsActive = request.IsActive
            };

            if (request.Image != null)
            {
                dto.CategoryImageURL =
                    await _fileStorage.SaveCategoryImageAsync(request.Image, ct);
            }

            var id = await _service.CreateAsync(dto, ct);
            return Ok(new { categoryId = id });
        }



        [HttpPut("{id:int}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Update(int id, [FromForm] CategoryUpsertRequest request, CancellationToken ct)
        {
            var existing = await _service.GetByIdAsync(id, ct);
            if (existing == null)
                return NotFound(new { message = "Category not found." });

            var dto = new CategoryUpsertDto
            {
                Name = request.Name,
                Description = request.Description,
                IsFeatured = request.IsFeatured,
                SortOrder = request.SortOrder,
                IsActive = request.IsActive,
                CategoryImageURL = existing.CategoryImageURL  
            };

            if (request.Image != null)
            {
                dto.CategoryImageURL =
                    await _fileStorage.SaveCategoryImageAsync(request.Image, ct);
            }

            await _service.UpdateAsync(id, dto, ct);

            return Ok(new { message = "Update successful." });
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
