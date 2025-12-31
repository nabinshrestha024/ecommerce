using EcommerceProject.Models.DTOs.Profile;

namespace EcommerceProject.Services.Interfaces
{   
    public interface IUserProfileService
    {
        Task<ProfileResponseDto> GetMyProfileAsync();
        Task PutUpdateProfileAsync(UpdateProfileRequestDto dto);

        Task<IEnumerable<UserSocialLinkDto>> GetSocialLinksAsync();
        Task<UserSocialLinkDto> AddSocialLinkAsync(UserSocialLinkDto dto);

        Task UpdateSocialLinkAsync(int socialLinkId, UserSocialLinkDto dto);
        Task DeleteSocialLinkAsync(int socialLinkId);


        Task<string?> UploadProfileImageAsync(IFormFile imageFile, CancellationToken ct = default);
        Task<bool> RemoveProfileImageAsync(CancellationToken ct = default);

        Task PutUpdateProfileWithImageAsync(
            UpdateProfileRequestDto dto,
            IFormFile? profileImage = null,
            bool removeProfileImage = false,
            CancellationToken ct = default);
    }
}