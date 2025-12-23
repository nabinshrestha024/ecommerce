using EcommerceProject.Models.DTOs.User;

namespace EcommerceProject.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
        Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
        Task<bool> ChangePasswordAsync(int userId, ChangePasswordDto changePasswordDto);

        Task<AuthResponseDto> RefreshTokenAsync(string refreshToken);

        Task GeneratePasswordResetAsync(string email);

        Task ResetPasswordAsync(string token, string newPassword);
        Task LogoutAsync(int userId);
    }
}
