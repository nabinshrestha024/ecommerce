using EcommerceProject.Models.DTOs.Notification;

namespace EcommerceProject.Services.Interfaces
{
    public interface INotificationService
    {
        Task<List<NotificationDto>> GetMyNotificationsAsync(int userId, CancellationToken ct);
        Task MarkReadAsync(int userId, int notificationId, CancellationToken ct);
        Task NotifyUserAsync(int userId, string title, string message, int? orderId, bool sendEmail, CancellationToken ct);
        Task NotifyAdminsAsync(string title, string message, int? orderId, CancellationToken ct);
    }
}
