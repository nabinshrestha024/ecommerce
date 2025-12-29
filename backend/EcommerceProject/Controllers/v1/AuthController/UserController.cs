using EcommerceProject.Models.DTOs.User;
using EcommerceProject.Models.Entities;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EcommerceProject.Controllers.v1.AuthController
{
    [Route("v1/admin/user/")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }


        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllUsersPaged([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                var (users, totalCount) = await _userService.GetAllUsersPagedAsync(pageNumber, pageSize);

                foreach (var user in users)
                {
                    user.PasswordHash = null;
                }

                return Ok(new
                {
                    Data = users,
                    TotalCount = totalCount,
                    PageNumber = pageNumber,
                    PageSize = pageSize
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred", error = ex.Message });
            }
        }

        [HttpGet("id")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            try
            {
                var usersId = await _userService.GetUserByIdAsync(userId);

                return Ok(new
                {
                    Data = usersId,
                });
            }
            catch(Exception ex)
            {
                return StatusCode(500, new { message = "An error occured", error = ex.Message }); 
            }
        }

        [HttpPut("update")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateUser(int id , UpdateUserDto dto)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var role = User.FindFirst(ClaimTypes.Role)?.Value;

            if(role != "Admin" && currentUserId != id)
            {
                return Forbid();

            }

            await _userService.UpdateUserAsync(id, dto);

            return Ok("User Updated Successfully");




        }

        [HttpDelete("delete")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            await _userService.DeleteUserAsync(userId);
            return Ok("User deleted successfully");
        }


    }
}
