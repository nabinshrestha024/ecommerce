namespace EcommerceProject.Models.DTOs.Profile
{
    public class UpdateProfileRequestDto
    {
        public string FullName { get; set; } = default!;
        //public string? Phone { get; set; } // remove it
        public string? Address { get; set; }
        public string? City { get; set; }
        // public string? ProfileImageUrl { get; set; }

        //public DateOnly? DateOfBirth { get; set; } // remove it
        //public GenderType? Gender { get; set; } // remove it
        public string? Bio { get; set; }
    }
}