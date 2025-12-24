namespace EcommerceProject.Models.DTOs.Profile
{
    public class ProfileImageDto
    {  
        public string ImageUrl { get; set; } = default!;
        public DateTime? UploadedAt { get; set; }
    }
}