using EcommerceProject.Models.DTOs.Profile;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IUserProfileRepository
    {
        Task<ProfileResponseDto?> GetProfileByUserIdAsync(int userId);
        Task PutUpdateProfileAsync(int userId, UpdateProfileRequestDto dto);
        Task RemoveProfileImageAsync(int userId);
        Task UpdateProfileImageAsync(int userId, string profileImageUrl);

        Task<IEnumerable<UserSocialLinkDto>> GetSocialLinksAsync(int userId);
        Task<int> AddSocialLinkAsync(int userId, UserSocialLinkDto dto);
        Task UpdateSocialLinkAsync(int socialLinkId, UserSocialLinkDto dto);
        Task DeleteSocialLinkAsync(int socialLinkId);

    } 
}