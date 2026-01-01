namespace EcommerceProject.Models.DTOs.Profile
{
    public class UpsertUserSocialLinkRequestDto
    {
        public string Platform { get; set; } = null!;
        public string ProfileLinkUrl { get; set; } = null!;
    }
}
