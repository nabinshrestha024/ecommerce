namespace EcommerceProject.Models.Entities
{
    public class UserSocialLink
    {
        public int SocialLinkId {get; set; }

        public int UserId { get; set; }
        public string Platform { get; set; } = null!;
        public string ProfileUrl { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
    }
}