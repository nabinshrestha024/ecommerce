using EcommerceProject.Models.DTOs.Profile;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("/v1/profile")]

public class ProfileController : ControllerBase
{
    private readonly IUserProfileService _userProfileService;
    public ProfileController(IUserProfileService userProfileService)
    {
        _userProfileService = userProfileService;
    }

    [HttpGet("{userId:int}")]
    public async Task<IActionResult> GetProfileByUserId(int userId)
    {
        var profile = await _userProfileService.GetProfileByUserIdAsync(userId);
        return Ok(profile);
    }

    [HttpPut("{userId:int}")]
    public async Task<IActionResult> PutUpdateProfile(
        int userId,
        [FromBody] UpdateProfileRequestDto dto)
    {
        await _userProfileService.PutUpdateProfileAsync(userId, dto);
        return NoContent();;
    }

    [HttpPatch("{userId:int}")]
    public async Task<IActionResult> PatchUpdateProfile(
    int userId,
    [FromBody] PatchProfileRequestDto dto)
    {
        await _userProfileService.UpdateProfileAsync(userId, dto);
        return NoContent();
    }

    [HttpPut("{userId:int}/change-password")]
    public async Task<IActionResult> ChangePassword(
        int userId,
        [FromBody] ChangePasswordRequestDto dto)
    {
        await _userProfileService.ChangePasswordAsync(userId, dto);
        return NoContent();
    }
}
   
