using EcommerceProject.Models.DTOs.Profile;

namespace EcommerceProject.Services.Interfaces
{   
public interface IUserProfileService
{
    Task<ProfileResponseDto?> GetProfileByUserIdAsync(int userId);
    Task PutUpdateProfileAsync(int userId, UpdateProfileRequestDto dto);
    Task UpdateProfileAsync(int userId, PatchProfileRequestDto dto);

    Task ChangePasswordAsync(int userId, ChangePasswordRequestDto dto);

    Task<IEnumerable<UserSocialLinkDto>> GetSocialLinksAsync(int userId);
    Task AddSocialLinkAsync(int userId, UserSocialLinkDto dto);
    Task UpdateSocialLinkAsync(int socialLinkId, UserSocialLinkDto dto);
    Task DeleteSocialLinkAsync(int socialLinkId);

    Task<IEnumerable<UserOrdersDto>> GetUserOrdersAsync(int userId);
    Task<UserOrderDetailsDto?> GetOrderDetailsAsync(int userId, int orderId);
}
}