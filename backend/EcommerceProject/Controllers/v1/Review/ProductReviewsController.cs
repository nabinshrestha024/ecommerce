using System.Security.Claims;
using EcommerceProject.Models.DTOs.Review;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Review
{
    [ApiController]
    [Route("v1/reviews")]
    public class ProductReviewsController : ControllerBase
    {
        private readonly IReviewService _service;

        public ProductReviewsController(IReviewService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create(
            int productId,
            CreateReviewDto dto,
            CancellationToken ct)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrWhiteSpace(userIdClaim))
                return Unauthorized(new { message = "Missing user id claim." });

            int userId = int.Parse(userIdClaim);

            await _service.AddProductReviewAsync(productId, userId, dto, ct);
            return Ok("Review added successfully");
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(int productId, CancellationToken ct)
        {
            return Ok(await _service.GetProductReviewsAsync(productId, ct));
        }

        [HttpDelete("{reviewId:int}")]
        public async Task<IActionResult> DeleteProductReview(int reviewId, CancellationToken ct)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrWhiteSpace(userIdClaim))
                return Unauthorized(new { message = "Missing user id claim." });

            int userId = int.Parse(userIdClaim);

            await _service.DeleteReviewByUserAsync(reviewId, userId, ct);
            return Ok("Review deactivated successfully");
        }

        
    }

}
