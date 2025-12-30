using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Review
{
    [ApiController]
    [Route("v1/admin/reviews")]
    [Authorize(Roles = "Admin")]
    public class AdminReviewsController : ControllerBase
    {
        private readonly IReviewService _service;

        public AdminReviewsController(IReviewService service)
        {
            _service = service;
        }

        [HttpDelete("productdelete")]
        public async Task<IActionResult> DeleteProductReview(
            int reviewId,
            CancellationToken ct)
        {
            await _service.DeleteReviewByAdminAsync(reviewId, ct);
            
            return Ok("Review deactivated succesfully");
        }
        [HttpGet("product")]
        public async Task<IActionResult> GetProductAll(
       [FromQuery] PaginationDto pagination,
       CancellationToken ct)
        {
            var result = await _service.AdminGetProductReviewsAsync(pagination, ct);
            return Ok(result);
        }
        [HttpGet("website")]
        public async Task<IActionResult> GetWebsiteAll(
       [FromQuery] PaginationDto pagination,
       CancellationToken ct)
        {
            var result = await _service.AdminGetWebsiteReviewsAsync(pagination, ct);
            return Ok(result);
        }
        [HttpDelete("websitedelete")]
        public async Task<IActionResult> DeleteWebsiteReview(int reviewId, CancellationToken ct)
        {
            await _service.DeleteWebsiteReviewByAdminAsync(reviewId, ct);
            return Ok("Review deactivated successfully");
        }
    }

}
