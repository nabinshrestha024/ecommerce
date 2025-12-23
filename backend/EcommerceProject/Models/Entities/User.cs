namespace EcommerceProject.Models.Entities
{
    public class User
    {
        public int UserId { get; set; }
        public string Email { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string? PasswordHash { get; set; }

        public short Status { get; set; } = 1;
        public string? ProfileImageUrl { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }

        public bool Role { get; set; } = true;
        public string? RefreshToken { get; set; }
        public string? AccessToken { get; set; }

        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

        public UserProfile? UserProfile { get; set; }
        public ICollection<UserSocialLink> SocialLinks { get; set; } = new List<UserSocialLink>();
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
