using EcommerceProject.Models.DTOs.Notification;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface INotificationRepository
    {
        Task<int> CreateAsync(CreateNotificationDto dto, CancellationToken ct);
        Task<List<NotificationDto>> GetByUserAsync(int userId, CancellationToken ct);
        Task MarkReadAsync(int userId, int notificationId, CancellationToken ct);
    }
}
