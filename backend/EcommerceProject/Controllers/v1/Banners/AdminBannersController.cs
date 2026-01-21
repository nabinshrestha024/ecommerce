using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using EcommerceProject.Models.DTOs.Banners;
using EcommerceProject.Services.Interfaces;

namespace EcommerceProject.Controllers.v1.Banners
{
    [ApiController]
    [Route("v1/admin/banners")]
    public class AdminBannersController : ControllerBase
    {
        private readonly IBannerService _service;

        private readonly IUrlService _urlService;

        public AdminBannersController(IBannerService service, IUrlService urlService)
        {
            _service = service;
            _urlService = urlService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var banners = await _service.GetAllBannerAsync();

            var data = banners.ToList();

            foreach(var banner in data)
            {
                if (!string.IsNullOrEmpty(banner.ImageUrl))
                {
                    banner.ImageUrl = _urlService.ToAbsoluteUrl(banner.ImageUrl);
                }
            }


            return Ok(new { 
                message = "Banners retrieved successfully", 
                data = data 
            });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create([FromForm] CreateBannerDto request, CancellationToken ct)
        {
            var bannerId = await _service.CreateBannerAsync(request, request.ImageUrl, ct);
            return Ok(new { message = "Banner created successfully", data = new { BannerId = bannerId } });
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Update(int id, [FromForm] UpdateBannerDto request, CancellationToken ct)
        {
            await _service.UpdateBannerAsync(id, request, request.ImageUrl, ct);
            return Ok(new { message = "Banner updated successfully" });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteBannerAsync(id);
            return Ok(new { message = "Banner deleted successfully" });
        }
    }
}