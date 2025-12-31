namespace EcommerceProject.Models.DTOs.User
{
    public class PasswordResetDto
    {
        public int OtpId { get; set; }
        public string UserId { get; set; }
        public string OtpCode { get; set; }
        public DateTime ExpiresAt { get; set; }
        public bool IsUsed { get; set; }

    }
}
