using EcommerceProject.Models.DTOs.Profile;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("v1/profile/social-links")]
public class SocialLinksController : ControllerBase
{
    private readonly IUserProfileService _service;

    public SocialLinksController(IUserProfileService service)
    {
        _service = service;
    }

    [HttpGet("{userId:int}")]
    public async Task<IActionResult> Get(int userId)
        => Ok(await _service.GetSocialLinksAsync(userId));

    [HttpPost("{userId:int}")]
    public async Task<IActionResult> Post(int userId, UserSocialLinkDto dto)
    {
        await _service.AddSocialLinkAsync(userId, dto);
        return NoContent();
    }

    [HttpPut("{socialLinkId:int}")]
    public async Task<IActionResult> Put(int socialLinkId, UserSocialLinkDto dto)
    {
        await _service.UpdateSocialLinkAsync(socialLinkId, dto);
        return NoContent();
    }

    [HttpDelete("{socialLinkId:int}")]
    public async Task<IActionResult> Delete(int socialLinkId)
    {
        await _service.DeleteSocialLinkAsync(socialLinkId);
        return NoContent();
    }
}
