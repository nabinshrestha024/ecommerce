using EcommerceProject.Models.DTOs.Profile;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IUserProfileRepository
    {
        Task<ProfileResponseDto?> GetProfileByUserIdAsync(int userId);
        Task PutUpdateProfileAsync(int userId, UpdateProfileRequestDto dto);
        Task ChangePasswordAsync(int userId, string passwordHash);
        Task UpdateProfileAsync(int userId, PatchProfileRequestDto dto);
        Task<IEnumerable<UserSocialLinkDto>> GetSocialLinksAsync(int userId);
        Task AddSocialLinkAsync(int userId, UserSocialLinkDto dto);
        Task UpdateSocialLinkAsync(int socialLinkId, UserSocialLinkDto dto);
        Task DeleteSocialLinkAsync(int socialLinkId);

        Task<IEnumerable<UserOrdersDto>> GetOrdersAsync(int userId);
        Task<UserOrderDetailsDto?> GetOrderDetailsAsync(int userId, int orderId);
    } 
}