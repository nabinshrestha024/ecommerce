using EcommerceProject.Models.DTOs.Profile;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace EcommerceProject.Services.Implementations
{
    public class UserProfileService : IUserProfileService
    {
        private readonly IUserProfileRepository _repo;
        private readonly IFileStorageService _files;
        private readonly ICurrentProfileService _currentUser;
        private readonly ILogger<UserProfileService> _logger;
        private readonly IUrlService _urlService;

        public UserProfileService(
            IUserProfileRepository repo,
            IFileStorageService files,
            ICurrentProfileService currentUser,
            ILogger<UserProfileService> logger,
            IUrlService urlService)
        
        {
            _repo = repo;
            _files = files;
            _currentUser = currentUser;
            _logger = logger;
            _urlService = urlService;
        }

        private int UserId => _currentUser.UserId;

        public async Task<ProfileResponseDto> GetMyProfileAsync()
        {
            var profile = await _repo.GetProfileByUserIdAsync(UserId)
                ?? throw new KeyNotFoundException("User profile not found.");
            profile.ProfileImageUrl = _urlService.ToAbsoluteUrl(profile.ProfileImageUrl);
            return profile;
        }

        public async Task PutUpdateProfileAsync(UpdateProfileRequestDto dto)
        {
            ArgumentNullException.ThrowIfNull(dto);
            await _repo.PutUpdateProfileAsync(UserId, dto);
        }

       

      
        public async Task<IEnumerable<UserSocialLinkDto>> GetSocialLinksAsync()
            => await _repo.GetSocialLinksAsync(UserId);

        public async Task<UserSocialLinkDto> AddSocialLinkAsync(UpsertUserSocialLinkRequestDto dto)
        {
            ArgumentNullException.ThrowIfNull(dto);

            var id = await _repo.AddSocialLinkAsync(UserId, dto);

            return new UserSocialLinkDto
            {
                SocialLinkId = id,
                Platform = dto.Platform,
                ProfileLinkUrl = dto.ProfileLinkUrl,
                CreatedAt = DateTime.UtcNow
            };
        }

        public async Task UpdateSocialLinkAsync(int socialLinkId, UpsertUserSocialLinkRequestDto dto)
        {
            if (socialLinkId <= 0)
                throw new ArgumentException("Invalid social link ID.");

            ArgumentNullException.ThrowIfNull(dto);
            await _repo.UpdateSocialLinkAsync(socialLinkId, dto);
        }

        public async Task DeleteSocialLinkAsync(int socialLinkId)
        {
            if (socialLinkId <= 0)
                throw new ArgumentException("Invalid social link ID.");

            await _repo.DeleteSocialLinkAsync(socialLinkId);
        }



        public async Task<string?> UploadProfileImageAsync(
    IFormFile imageFile,
    CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(imageFile);

            var profile = await GetMyProfileAsync();

            if (!string.IsNullOrEmpty(profile.ProfileImageUrl))
            {
                await _files.DeleteProfileImageAsync(profile.ProfileImageUrl, ct);
            }

            var imageUrl = await _files.SaveProfileImageAsync(imageFile, UserId, ct);

            await _repo.UpdateProfileImageAsync(UserId, imageUrl);

            _logger.LogInformation(
                "Profile image uploaded for user {UserId}",
                UserId);

            return imageUrl;
        }


        public async Task<bool> RemoveProfileImageAsync(CancellationToken ct = default)
        {
            var profile = await GetMyProfileAsync();

            if (string.IsNullOrEmpty(profile.ProfileImageUrl))
                return false;

            await _files.DeleteProfileImageAsync(profile.ProfileImageUrl, ct);

            await _repo.RemoveProfileImageAsync(UserId);

            _logger.LogInformation("Profile image removed for user {UserId}", UserId);
            return true;
        }
        
        public async Task PutUpdateProfileWithImageAsync(
            UpdateProfileRequestDto dto,
            IFormFile? profileImage = null,
            bool removeProfileImage = false,
            CancellationToken ct = default)
        {
            string? imageUrl = dto.ProfileImageUrl;

            if (profileImage != null)
                imageUrl = await UploadProfileImageAsync(profileImage, ct);
            else if (removeProfileImage)
                await RemoveProfileImageAsync(ct);

            dto.ProfileImageUrl = imageUrl;
            await _repo.PutUpdateProfileAsync(UserId, dto);
        }
    }
}
