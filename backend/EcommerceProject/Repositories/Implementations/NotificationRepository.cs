using System.Data;
using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.Notification;
using EcommerceProject.Repositories.Interfaces;

namespace EcommerceProject.Repositories.Implementations
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly ISqlConnectionFactory _db;
        public NotificationRepository(ISqlConnectionFactory db) => _db = db;

        public async Task<int> CreateAsync(CreateNotificationDto dto, CancellationToken ct)
        {
            using var conn = _db.CreateConnection();

            return await conn.ExecuteScalarAsync<int>(
                "spNotifications_Create",
                new { dto.UserId, dto.Title, dto.Message, dto.OrderId },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<List<NotificationDto>> GetByUserAsync(int userId, CancellationToken ct)
        {
            using var conn = _db.CreateConnection();

            var rows = await conn.QueryAsync<NotificationDto>(
                "spNotifications_GetByUser",
                new { UserId = userId },
                commandType: CommandType.StoredProcedure
            );

            return rows.ToList();
        }

        public async Task MarkReadAsync(int userId, int notificationId, CancellationToken ct)
        {
            using var conn = _db.CreateConnection();

            await conn.ExecuteAsync(
                "spNotifications_MarkRead",
                new { UserId = userId, NotificationId = notificationId },
                commandType: CommandType.StoredProcedure
            );
        }
    }
}
