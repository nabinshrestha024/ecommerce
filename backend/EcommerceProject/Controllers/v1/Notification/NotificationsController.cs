using System.Security.Claims;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Notification
{
    [Authorize(Roles = "Admin")]
    [Route("v1/notifications")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationService _svc;

        public NotificationsController(INotificationService svc)
        {
            _svc = svc;
        }
        [HttpGet]
        public async Task<IActionResult> GetMy(CancellationToken ct)
        {
            var userIdClaim =
                User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? User.FindFirstValue("sub");

            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized("Invalid user id.");

            var list = await _svc.GetMyNotificationsAsync(userId, ct);
            return Ok(list);
        }

        [HttpPut("{id:int}/read")]
        public async Task<IActionResult> MarkRead(int id, CancellationToken ct)
        {
            var userIdClaim =
                User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? User.FindFirstValue("sub");

            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized("Invalid user id.");

            await _svc.MarkReadAsync(userId, id, ct);
            return Ok(new { message = "Marked as read." });
        }
    }
}
