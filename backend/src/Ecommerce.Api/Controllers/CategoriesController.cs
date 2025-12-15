using Ecommerce.Application.DTOs.Category;
using Ecommerce.Application.Features.Categories.Commands;
using Ecommerce.Application.Features.Categories.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Api.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public CategoriesController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] bool? isActive, [FromQuery] string? name)
        {
            var query = new GetAllCategoriesQuery
            {
                Filter = new CategoryFilterDto
                {
                    IsActive = isActive,
                    Name = name
                }
            };

             var result = await _mediator.Send(query);
             return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var category = await _mediator.Send(new GetCategoryByIdQuery(id));

            if (category == null)
                return NotFound();

            return Ok(category);
        }
        [HttpPost("upload-image")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded");

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };
            var extension = Path.GetExtension(file.FileName).ToLower();

            if (!allowedExtensions.Contains(extension))
                return BadRequest("Invalid image format");

            var uploadsFolder = Path.Combine("wwwroot", "images", "categories");
            Directory.CreateDirectory(uploadsFolder);

            var fileName = $"{Guid.NewGuid()}{extension}";
            var filePath = Path.Combine(uploadsFolder, fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            var imageUrl = $"/images/categories/{fileName}";

            return Ok(new { imageUrl });
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCategoryCommand command)
        {
            var id = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id }, new { CategoryId = id });
        }
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateCategoryDto dto)
        {
            if (id != dto.CategoryId)
                return BadRequest("Category ID mismatch");
            var command = new UpdateCategoryCommand
            {
                Category = dto
            };

            var updated = await _mediator.Send(command);

            if (!updated)
                return NotFound();

            return NoContent();
        }
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
          
            var deleted = await _mediator.Send(new DeleteCategoryCommand
            {
                CategoryId = id
            });

            if (!deleted)
                return NotFound();

            return NoContent();
        }

    }
}
