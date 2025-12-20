using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

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
}
   
