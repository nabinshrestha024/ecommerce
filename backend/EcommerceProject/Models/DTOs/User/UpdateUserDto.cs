namespace EcommerceProject.Models.DTOs.User
{
    public class UpdateUserDto
    {
        public string? FullName { get; set; }

        public string? Phone { get; set; }
        public string Address { get; set; }

     

        public bool Role { get; set; }

        public bool IsActive { get; set; }

    }
}
