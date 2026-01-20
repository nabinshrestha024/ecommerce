using EcommerceProject.Models.DTOs.User;

namespace EcommerceProject.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
        Task<AuthResponseDto> LoginAsync(LoginDto loginDto, bool isAdminLogin);
        Task<bool> ChangePasswordAsync(int userId, ChangePasswordDto changePasswordDto);

        Task<AuthResponseDto> RefreshTokenAsync(string refreshToken);

        Task ForgotPasswordAsync(string email);

        Task VerifyOtpAsync(string email, string otp);

        Task ResetPasswordAsync(string email, string otp, string newPassword);
        Task LogoutAsync(int userId);
    }
}
