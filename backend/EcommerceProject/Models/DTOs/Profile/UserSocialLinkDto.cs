namespace EcommerceProject.Models.DTOs.Profile
{
    public class UserSocialLinkDto
    {
        public int SocialLinkId { get; set; }
        public string Platform { get; set; } = null!;
        public string ProfileLinkUrl { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
    }
}