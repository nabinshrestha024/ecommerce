namespace EcommerceProject.Models.Entities
{
    public class UserProfile
    {
        public int UserId { get; set; }

        // public DateTime? DateOfBirth { get; set; }
        // public string? Gender { get; set; }  // remove it
        public string? Bio { get; set; }    
    }
}