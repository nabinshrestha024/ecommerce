using EcommerceProject.Models.DTOs.Profile;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IUserProfileRepository
    {
        Task<ProfileResponseDto?> GetProfileByUserIdAsync(int userId);
    } 
}