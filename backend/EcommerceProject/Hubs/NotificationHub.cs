using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;

namespace EcommerceProject.Hubs
{
    public class NotificationHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            var userId = Context.User?.FindFirstValue(ClaimTypes.NameIdentifier)
                         ?? Context.User?.FindFirstValue("sub");

            if (int.TryParse(userId, out var uid))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, UserGroup(uid));
            }

            var role = Context.User?.FindFirstValue(ClaimTypes.Role);
            if (!string.IsNullOrWhiteSpace(role))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, RoleGroup(role));
            }

            await base.OnConnectedAsync();
        }

        public static string UserGroup(int userId) => $"user:{userId}";
        public static string RoleGroup(string role) => $"role:{role}";
    }

}
