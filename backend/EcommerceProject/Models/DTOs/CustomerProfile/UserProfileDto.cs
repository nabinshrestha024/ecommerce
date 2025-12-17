
namespace EcommerceProject.Models.DTOs.Profile;

    public class UserProfileDto
    {
        public int UserId { get; set; }
        public string? Email { get; set; }
        public string? FullName { get; set; }
        public int Status { get; set; }
        public string? ProfileImageUrl { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public bool Role { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }