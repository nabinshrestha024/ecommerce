using EcommerceProject.Models.DTOs.User;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EcommerceProject.Controllers.v1.AuthController
{
    [Route("api/auth/")]
    [ApiController]
    public class AuthController : ControllerBas
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
                return Ok(new
                {
                    token = result.Token,
                    expiration = result.Expiration,
                    user = result.user
                });
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

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            await _authService.LogoutAsync(userId);

            return Ok(new { message = "Logout successful" });
        }



    }
}
