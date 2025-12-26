using EcommerceProject.Models.DTOs.Profile;

namespace EcommerceProject.Services.Interfaces
{   
    public interface IUserProfileService
    {
        Task<ProfileResponseDto> GetMyProfileAsync();
        Task PutUpdateProfileAsync(UpdateProfileRequestDto dto);
        Task UpdateProfileAsync(PatchProfileRequestDto dto);
        Task ChangePasswordAsync(ChangePasswordRequestDto dto);

        Task<IEnumerable<UserSocialLinkDto>> GetSocialLinksAsync();
        Task AddSocialLinkAsync(UserSocialLinkDto dto);
        Task UpdateSocialLinkAsync(int socialLinkId, UserSocialLinkDto dto);
        Task DeleteSocialLinkAsync(int socialLinkId);

        Task<IEnumerable<UserOrdersDto>> GetMyOrdersAsync();
        Task<UserOrderDetailsDto?> GetOrderDetailsAsync(int orderId);

        Task<string?> UploadProfileImageAsync(IFormFile imageFile, CancellationToken ct = default);
        Task<bool> RemoveProfileImageAsync(CancellationToken ct = default);

        Task PutUpdateProfileWithImageAsync(
            UpdateProfileRequestDto dto,
            IFormFile? profileImage = null,
            bool removeProfileImage = false,
            CancellationToken ct = default);
    }
}