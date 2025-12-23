namespace EcommerceProject.Models.Entities
{
    public class UserProfile
    {
        public int UserId { get; set; }

        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? Bio { get; set; }    
    }
}