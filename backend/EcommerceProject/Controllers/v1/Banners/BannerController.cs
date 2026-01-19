using Microsoft.AspNetCore.Mvc;

using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using EcommerceProject.Models.DTOs.Banners;

namespace EcommerceProject.Controllers.v1.Banners;

[ApiController]
[Route("v1/banners")]

public class BannerController : ControllerBase
{
    private readonly IBannerService _service;

    public BannerController(IBannerService service)
    {
        _service = service;
    }

    [AllowAnonymous]
    [HttpGet("active")]
    public async Task<IActionResult> GetAll([FromQuery] string sliderCode = "home")
    {
        var banners = await _service.GetAllBannerAsync(sliderCode);
        return Ok(new { message = "Banners retrieved successfully", data = banners });
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create (CreateBannerDto dto)
    {
        var id = await _service.CreateBannerAsync(dto);
        return Ok(new { message = "Banner created successfully", data = new { BannerId = id } });
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update (int id, UpdateBannerDto dto)
    {
        
        if (id != dto.BannerId)
        {
            return BadRequest(new { message = "Banner ID mismatch" });
        }

        await _service.UpdateBannerAsync(dto);
        return Ok(new { message = "Banner updated successfully" });
    }
}