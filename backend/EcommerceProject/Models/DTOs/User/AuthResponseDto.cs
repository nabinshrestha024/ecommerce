namespace EcommerceProject.Models.DTOs.User
{
    public class AuthResponseDto
    {
        public string Token { get; set; } = String.Empty;
        public DateTime Expiration { get; set; }

        public UserDto user { get; set; } = new UserDto();
    }
}
