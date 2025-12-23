using EcommerceProject.Models.DTOs.Profile;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers
{
    [ApiController]
    [Route("/v1/profile")]
    public class ProfileController : ControllerBase
    {
        private readonly IUserProfileService _userProfileService;
        private readonly ILogger<ProfileController> _logger;

        public ProfileController(
            IUserProfileService userProfileService,
            ILogger<ProfileController> logger)
        {
            _userProfileService = userProfileService;
            _logger = logger;
        }

        [HttpGet("{userId:int}")]
        public async Task<IActionResult> GetProfileByUserId(int userId)
        {
            var profile = await _userProfileService.GetProfileByUserIdAsync(userId);
            if (profile == null) return NotFound();
            return Ok(profile);
        }

        [HttpPut("{userId:int}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> PutUpdateProfile(
        int userId,
        [FromForm] UpdateProfileWithImageRequestDto body           
        ) 
        {
                try
                {
                    await _userProfileService.PutUpdateProfileWithImageAsync(
                    userId, 
                    body, 
                    body.ProfileImageFile,
                    body.RemoveProfileImage
                    ); 
                
                    return NoContent();
                }
                catch (ArgumentException ex)
                {
                    _logger.LogWarning(ex, "Validation error updating profile for user {UserId}", userId);
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating profile for user {UserId}", userId);
                return StatusCode(500, new { error = "Internal server error" });
            }
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

        [HttpPost("{userId:int}/upload-image")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadProfileImage(
            int userId,
            IFormFile image,
            CancellationToken ct)
        {
            try
            {
                if (image == null || image.Length == 0)
                    return BadRequest(new { error = "No image file provided" });

                var imageUrl = await _userProfileService.UploadProfileImageAsync(userId, image);
                
                return Ok(new { 
                    message = "Profile image uploaded successfully", 
                    imageUrl 
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading profile image for user {UserId}", userId);
                return StatusCode(500, new { error = "Internal server error" });
            }
        }

        [HttpDelete("{userId:int}/profile-image")]
        public async Task<IActionResult> RemoveProfileImage(
            int userId,
            CancellationToken ct)
        {
            try
            {
                var success = await _userProfileService.RemoveProfileImageAsync(userId);
                
                if (success)
                    return Ok(new { message = "Profile image removed successfully" });
                else
                    return NotFound(new { error = "No profile image found to remove" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error removing profile image for user {UserId}", userId);
                return StatusCode(500, new { error = "Internal server error" });
            }
        }
    }
}