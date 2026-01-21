using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using EcommerceProject.Models.DTOs.Banners;
using EcommerceProject.Services.Interfaces;

namespace EcommerceProject.Controllers.v1.Banners
{
    [ApiController]
    [Route("v1/banners")]
    public class BannerController : ControllerBase
    {
        private readonly IBannerService _service;

        private readonly IUrlService _urlService;

        public BannerController(IBannerService service, IUrlService urlService)
        {
            _service = service;
            _urlService = urlService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var banners = await _service.GetActiveBannerAsync();

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
    }
}