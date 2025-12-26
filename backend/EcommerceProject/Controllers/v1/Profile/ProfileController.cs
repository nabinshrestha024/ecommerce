using EcommerceProject.Models.DTOs.Profile;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers
{
    [ApiController]
    [Authorize]
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

        [HttpGet("me")]
        public async Task<IActionResult> GetMyProfile()
        {
            var profile = await _userProfileService.GetMyProfileAsync();
            return Ok(profile);
        }

        [HttpPut("me")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> PutUpdateProfile(
            [FromForm] UpdateProfileWithImageRequestDto body)
        {
            try
            {
                await _userProfileService.PutUpdateProfileWithImageAsync(
                    body,
                    body.ProfileImageFile,
                    body.RemoveProfileImage ?? false);

                return NoContent();
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex, "Validation error updating profile");
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating profile");
                return StatusCode(500, new { error = "Internal server error" });
            }
        }

        [HttpPatch("me")]
        public async Task<IActionResult> PatchUpdateProfile(
            [FromBody] PatchProfileRequestDto dto)
        {
            await _userProfileService.UpdateProfileAsync(dto);
            return NoContent();
        }

        [HttpPut("me/change-password")]
        public async Task<IActionResult> ChangePassword(
            [FromBody] ChangePasswordRequestDto dto)
        {
            await _userProfileService.ChangePasswordAsync(dto);
            return NoContent();
        }

        [HttpPost("me/upload-image")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadProfileImage(
            IFormFile image,
            CancellationToken ct)
        {
            try
            {
                if (image == null || image.Length == 0)
                    return BadRequest(new { error = "No image file provided" });

                var imageUrl =
                    await _userProfileService.UploadProfileImageAsync(image, ct);

                return Ok(new
                {
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
                _logger.LogError(ex, "Error uploading profile image");
                return StatusCode(500, new { error = "Internal server error" });
            }
        }

        [HttpDelete("me/profile-image")]
        public async Task<IActionResult> RemoveProfileImage(
            CancellationToken ct)
        {
            try
            {
                var success =
                    await _userProfileService.RemoveProfileImageAsync(ct);

                return success
                    ? Ok(new { message = "Profile image removed successfully" })
                    : NotFound(new { error = "No profile image found to remove" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error removing profile image");
                return StatusCode(500, new { error = "Internal server error" });
            }
        }
    }
}
