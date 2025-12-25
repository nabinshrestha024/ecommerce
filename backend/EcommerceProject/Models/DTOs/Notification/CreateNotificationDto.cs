namespace EcommerceProject.Models.DTOs.Notification
{
    public class CreateNotificationDto
    {
        public int? UserId { get; set; }     
        public string Title { get; set; } = default!;
        public string Message { get; set; } = default!;
        public int? OrderId { get; set; }
    }
}
