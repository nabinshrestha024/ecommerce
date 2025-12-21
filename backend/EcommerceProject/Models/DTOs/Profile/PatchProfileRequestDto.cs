namespace EcommerceProject.Models.DTOs.Profile
{
    public class PatchProfileRequestDto
    {
        public string? FullName { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? ProfileImageUrl { get; set; }
        public short Status { get; set; } 
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? Bio { get; set; }
    }
}


