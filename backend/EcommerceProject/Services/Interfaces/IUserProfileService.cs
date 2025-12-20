using EcommerceProject.Models.DTOs.Profile;

namespace EcommerceProject.Services.Interfaces
{   
public interface IUserProfileService
{
    Task<ProfileResponseDto?> GetProfileByUserIdAsync(int userId);
}
}