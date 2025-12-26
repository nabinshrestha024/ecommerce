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

        public UserProfileService(
            IUserProfileRepository repo,
            IFileStorageService files,
            ICurrentProfileService currentUser,
            ILogger<UserProfileService> logger)
        {
            _repo = repo;
            _files = files;
            _currentUser = currentUser;
            _logger = logger;
        }

        private int UserId => _currentUser.UserId;

        public async Task<ProfileResponseDto> GetMyProfileAsync()
        {
            var profile = await _repo.GetProfileByUserIdAsync(UserId)
                ?? throw new KeyNotFoundException("User profile not found.");

            return profile;
        }

        public async Task PutUpdateProfileAsync(UpdateProfileRequestDto dto)
        {
            ArgumentNullException.ThrowIfNull(dto);
            await _repo.PutUpdateProfileAsync(UserId, dto);
        }

        public async Task UpdateProfileAsync(PatchProfileRequestDto dto)
        {
            ArgumentNullException.ThrowIfNull(dto);
            await _repo.UpdateProfileAsync(UserId, dto);
        }

        public async Task ChangePasswordAsync(ChangePasswordRequestDto dto)
        {
            ArgumentNullException.ThrowIfNull(dto);

            var profile = await _repo.GetProfileByUserIdAsync(UserId)
                ?? throw new KeyNotFoundException("User not found.");

            if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, profile.PasswordHash))
                throw new UnauthorizedAccessException("Current password is incorrect.");

            var newHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            await _repo.ChangePasswordAsync(UserId, newHash);
        }

        public async Task<IEnumerable<UserSocialLinkDto>> GetSocialLinksAsync()
            => await _repo.GetSocialLinksAsync(UserId);

        public async Task AddSocialLinkAsync(UserSocialLinkDto dto)
        {
            ArgumentNullException.ThrowIfNull(dto);
            await _repo.AddSocialLinkAsync(UserId, dto);
        }

        public async Task UpdateSocialLinkAsync(int socialLinkId, UserSocialLinkDto dto)
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

        public async Task<IEnumerable<UserOrdersDto>> GetMyOrdersAsync()
            => await _repo.GetOrdersAsync(UserId);

        public async Task<UserOrderDetailsDto?> GetOrderDetailsAsync(int orderId)
        {
            if (orderId <= 0)
                throw new ArgumentException("Invalid order ID.");

            return await _repo.GetOrderDetailsAsync(UserId, orderId);
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

            await _repo.UpdateProfileAsync(UserId, new PatchProfileRequestDto
            {
                ProfileImageUrl = imageUrl
            });

            _logger.LogInformation("Profile image uploaded for user {UserId}", UserId);
            return imageUrl;
        }

        public async Task<bool> RemoveProfileImageAsync(CancellationToken ct = default)
        {
            var profile = await GetMyProfileAsync();

            if (string.IsNullOrEmpty(profile.ProfileImageUrl))
                return false;

            await _files.DeleteProfileImageAsync(profile.ProfileImageUrl, ct);

            await _repo.UpdateProfileAsync(UserId, new PatchProfileRequestDto
            {
                ProfileImageUrl = null
            });

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
