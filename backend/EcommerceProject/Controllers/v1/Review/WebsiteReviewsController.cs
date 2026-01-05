using System.Security.Claims;
using EcommerceProject.Models.DTOs.Review;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Review
{
    [ApiController]
    [Route("v1/website-reviews")]
    
    public class WebsiteReviewsController : ControllerBase
    {
        private readonly IReviewService _service;

        public WebsiteReviewsController(IReviewService service)
        {
            _service = service;
        }

        [Authorize(Roles = "Admin, Customer")]
        [HttpPost]
        public async Task<IActionResult> Create(CreateReviewDto dto, CancellationToken ct)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrWhiteSpace(userIdClaim))
                return Unauthorized(new { message = "Missing user id claim." });

            int userId = int.Parse(userIdClaim);
            await _service.AddWebsiteReviewAsync(userId, dto, ct);
            return Ok("Review added successfully");
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken ct)
        {
            return Ok(await _service.GetWebsiteReviewsAsync(ct));
        }

        [HttpDelete("{reviewId:int}")]
        [Authorize(Roles = "Admin, Customer")]
        public async Task<IActionResult> DeleteWebsiteReview(int reviewId, CancellationToken ct)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrWhiteSpace(userIdClaim))
                return Unauthorized(new { message = "Missing user id claim." });

            int userId = int.Parse(userIdClaim);
            await _service.DeleteWebsiteReviewByUserAsync(reviewId, userId, ct);
            return Ok("Review deactived successfully");
        }
    }

}
