namespace EcommerceProject.Models.DTOs.User
{
    public class RegisterDto
    {
        public string FullName { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public string Password { get; set; } = String.Empty;
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }

    }
}
