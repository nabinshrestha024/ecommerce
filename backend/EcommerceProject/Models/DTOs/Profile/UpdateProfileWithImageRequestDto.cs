namespace EcommerceProject.Models.DTOs.Profile
{
    [Obsolete("Use UpdateProfileRequestDto with separate IFormFile parameter instead")]
    public class UpdateProfileWithImageRequestDto: UpdateProfileRequestDto
    {
        public IFormFile? ProfileImageFile { get; set; }
        public bool? RemoveProfileImage { get; set; }
    }
}