namespace EcommerceProject.Models.DTOs.Profile
{
    public class UpdateProfileWithImageRequestDto
    {
        public string FullName { get; set; } = null!;
        //public string? Phone { get; set; }  // remove it
        public string? Address { get; set; }
        public string? City { get; set; }
        // public DateOnly? DateOfBirth { get; set; } // remove it
        // public GenderType? Gender { get; set; } // remove it
        public string? Bio { get; set; }

        // public IFormFile? ProfileImageFile { get; set; }
    }
    public enum GenderType
    {
        Male,
        Female,
        Other
    }
}