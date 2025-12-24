namespace EcommerceProject.Models.DTOs.Notification
{
    public class NotificationDto
    {
        public int NotificationId { get; set; }
        public int? UserId { get; set; }
        public string Title { get; set; } = default!;
        public string Message { get; set; } = default!;
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }
        public int? OrderId { get; set; }
    }
}
