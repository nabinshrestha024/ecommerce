using EcommerceProject.Models.DTOs.Profile;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers
{
    [ApiController]
    [Authorize]
    [Route("v1/profile/social-links")]
    public class SocialLinksController : ControllerBase
    {
        private readonly IUserProfileService _service;

        public SocialLinksController(IUserProfileService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var links = await _service.GetSocialLinksAsync();
            return Ok(new { message = "Social links retrieved successfully!", links });
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UpsertUserSocialLinkRequestDto dto)
        {
            var result = await _service.AddSocialLinkAsync(dto);

            return CreatedAtAction(
                nameof(Get),
                new { socialLinkId = result.SocialLinkId },
                result
            );
        }

        [HttpPut("{socialLinkId:int}")]
        public async Task<IActionResult> Put(
            int socialLinkId,
            [FromBody] UpsertUserSocialLinkRequestDto dto)
        {
            await _service.UpdateSocialLinkAsync(socialLinkId, dto);
            return Ok(new { message = "Social link updated successfully!" });
        }
        
        [HttpDelete("{socialLinkId:int}")]
        public async Task<IActionResult> Delete(int socialLinkId)
        {
            await _service.DeleteSocialLinkAsync(socialLinkId);
            return Ok(new { message = "Social link deleted successfully!" });
        }
    }
}
