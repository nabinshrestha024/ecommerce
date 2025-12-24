using EcommerceProject.Hubs;
using EcommerceProject.Models.DTOs.Notification;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace EcommerceProject.Services.Implementations
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _repo;
        private readonly IHubContext<NotificationHub> _hub;
        private readonly IEmailSender _email;

        public NotificationService(
            INotificationRepository repo,
            IHubContext<NotificationHub> hub,
            IEmailSender email)
        {
            _repo = repo;
            _hub = hub;
            _email = email;
        }

        public Task<List<NotificationDto>> GetMyNotificationsAsync(int userId, CancellationToken ct)
            => _repo.GetByUserAsync(userId, ct);

        public Task MarkReadAsync(int userId, int notificationId, CancellationToken ct)
            => _repo.MarkReadAsync(userId, notificationId, ct);

        public async Task NotifyUserAsync(int userId, string title, string message, int? orderId, bool sendEmail, CancellationToken ct)
        {
            var id = await _repo.CreateAsync(new CreateNotificationDto
            {
                UserId = userId,
                Title = title,
                Message = message,
                OrderId = orderId
            }, ct);

            await _hub.Clients.Group(NotificationHub.UserGroup(userId))
                .SendAsync("notification:received", new
                {
                    notificationId = id,
                    title,
                    message,
                    orderId,
                    createdAt = DateTime.UtcNow
                }, ct);
            if (sendEmail)
            {
                //await _email.SendAsync(userEmail, title, message, ct);
            }
        }

        public async Task NotifyAdminsAsync(string title, string message, int? orderId, CancellationToken ct)
        {
            await _hub.Clients.Group(NotificationHub.RoleGroup("Admin"))
                .SendAsync("notification:received", new
                {
                    title,
                    message,
                    orderId,
                    createdAt = DateTime.UtcNow
                }, ct);

        }
    }
}
