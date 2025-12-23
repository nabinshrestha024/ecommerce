using EcommerceProject.Models.DTOs.SystemSettings;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.SystemSettings
{
    [ApiController]
    [Route("v1/admin/settings")]
    [Authorize(Roles = "Admin")]
    public class SettingsController : ControllerBase
    {
        private readonly ISettingsService _service;

        public SettingsController(ISettingsService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateSettingsDto dto)
        {
            var adminUser = User.Identity?.Name ?? "system";
            await _service.UpdateAsync(dto, adminUser);
            return Ok(new { message = "Settings updated successfully." });
        }
    }

}
