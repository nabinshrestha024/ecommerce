namespace EcommerceProject.Models.DTOs.Profile
{
    public class ProfileResponseDto
    {
        public int UserId {get; set; }

        public string Email { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string? Phone { get; set; }  
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? ProfileImageUrl { get; set; }

        public short Status { get; set; }
        public DateTime CreatedAt { get; set; }

        public DateTime? DateOfBirth { get; set; } 
        public string? Gender { get; set; }     
        public string? Bio { get; set; }
        public List<UserSocialLinkDto> SocialLinks { get; set; } = new();
    }
}