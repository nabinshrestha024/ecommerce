using EcommerceProject.Models.DTOs.User;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EcommerceProject.Controllers.v1.AuthController
{
    [Route("v1/auth/")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                var result = await _authService.RegisterAsync(registerDto);
                return Ok(result);
            }catch(InvalidOperationException ex)
            {
                return BadRequest(new {message = ex.Message});
            }catch(Exception ex)
            {
                return StatusCode(500, new { message = "An ERRROR  OCCURED ", error = ex.Message });
            }         

            
        }

        [HttpPost("login")]
        public async Task <IActionResult> Login([FromBody]LoginDto loginDto)
        {
            try
            {
                var result = await _authService.LoginAsync(loginDto);

                return Ok(result);
            }
            catch(UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch(Exception ex)
            {
                return StatusCode(500, new { message = "An error Occured", error = ex.Message });
            }

        }

        [HttpPost("refresh_token")]
        public async Task<IActionResult> Refresh([FromBody] string refreshToken)
        {
            var result = await _authService.RefreshTokenAsync(refreshToken);
            return Ok(result);
        }


        [HttpPost("change_password")]
        [Authorize]

        public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordDto changePasswordDto)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var result = await _authService.ChangePasswordAsync(userId, changePasswordDto);

                if (result)
                {
                    return Ok(new { message = "Password changed successfully" });
                }

                return BadRequest(new { message = "Failed to change password" });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (UnauthorizedAccessException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred", error = ex.Message });
            }
        }


        [HttpPost("auth/forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto dto)
        {
            await _authService.GeneratePasswordResetAsync(dto.Email);
            return Ok(new { message = "If the email exists, a reset link has been sent." });
        }

        [HttpPost("auth/reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto dto)
        {
            await _authService.ResetPasswordAsync(dto.Token, dto.NewPassword);
            return Ok(new { message = "Password reset successful." });
        }


        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            var currentuserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            await _authService.LogoutAsync(currentuserId);

            return Ok(new { message = "Logout successful" });
        }



    }
}
