namespace EcommerceProject.Models.Entities
{
    public class Notification
    {
        public int NotificationId {  get; set; }
        public int UserId {  get; set; }
        public string? Title { get; set; }
        public string? Message { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreateAt {  get; set; }
        public int OrderId {  get; set; }

    }
}
