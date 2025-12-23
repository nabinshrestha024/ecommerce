using EcommerceProject.Models.DTOs.Profile;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace EcommerceProject.Services.Implementations
{
    public class UserProfileService : IUserProfileService
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IFileStorageService _files;
        private readonly ILogger<UserProfileService> _logger;

        public UserProfileService(IUserProfileRepository userProfileRepository, IFileStorageService files, ILogger<UserProfileService> logger)
        {
            _userProfileRepository = userProfileRepository;
            _files = files;
            _logger = logger;
        }

        public async Task<ProfileResponseDto?> GetProfileByUserIdAsync(int userId)
        {
            if (userId <= 0)
                throw new UnauthorizedAccessException("Invalid user ID.");

            var profile = await _userProfileRepository.GetProfileByUserIdAsync(userId);

            if (profile == null)
                throw new KeyNotFoundException("User profile not found.");

            return profile;
        }

        public async Task PutUpdateProfileAsync(int userId, UpdateProfileRequestDto dto)
        {
            if (userId <= 0)
                throw new UnauthorizedAccessException("Invalid user context.");

            if (dto == null)
                throw new ArgumentNullException(nameof(dto));

            await _userProfileRepository.PutUpdateProfileAsync(userId, dto);
        }

        public async Task UpdateProfileAsync(int userId, PatchProfileRequestDto dto)
        {
            if (userId <= 0)
                throw new UnauthorizedAccessException("Invalid user context.");

            if (dto == null)
                throw new ArgumentNullException(nameof(dto));

            await _userProfileRepository.UpdateProfileAsync(userId, dto);
        }

        public async Task ChangePasswordAsync(int userId, ChangePasswordRequestDto dto)
        {
            if (userId <= 0)
                throw new UnauthorizedAccessException("Invalid user context.");

            if (dto == null)
                throw new ArgumentNullException(nameof(dto));

            var profile = await _userProfileRepository.GetProfileByUserIdAsync(userId);

            if (profile == null)
                throw new KeyNotFoundException("User not found.");

            if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, profile.PasswordHash))
                throw new UnauthorizedAccessException("Current password is incorrect.");

            var newHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            await _userProfileRepository.ChangePasswordAsync(userId, newHash);
        }

        public async Task<IEnumerable<UserSocialLinkDto>> GetSocialLinksAsync(int userId)
        {
            if (userId <= 0)
                throw new UnauthorizedAccessException("Invalid user context.");

            return await _userProfileRepository.GetSocialLinksAsync(userId);
        }

        public async Task AddSocialLinkAsync(int userId, UserSocialLinkDto dto)
        {
            if (userId <= 0)
                throw new UnauthorizedAccessException("Invalid user context.");

            if (dto == null)
                throw new ArgumentNullException(nameof(dto));

            await _userProfileRepository.AddSocialLinkAsync(userId, dto);
        }

        public async Task UpdateSocialLinkAsync(int socialLinkId, UserSocialLinkDto dto)
        {
            if (socialLinkId <= 0)
                throw new ArgumentException("Invalid social link ID.");

            if (dto == null)
                throw new ArgumentNullException(nameof(dto));

            await _userProfileRepository.UpdateSocialLinkAsync(socialLinkId, dto);
        }

        public async Task DeleteSocialLinkAsync(int socialLinkId)
        {
            if (socialLinkId <= 0)
                throw new ArgumentException("Invalid social link ID.");

            await _userProfileRepository.DeleteSocialLinkAsync(socialLinkId);
        }

        public async Task<IEnumerable<UserOrdersDto>> GetUserOrdersAsync(int userId)
        {
            if (userId <= 0)
                throw new UnauthorizedAccessException("Invalid user context.");

            return await _userProfileRepository.GetOrdersAsync(userId);
        }

        public async Task<UserOrderDetailsDto?> GetOrderDetailsAsync(int userId, int orderId)
        {
            if (userId <= 0 || orderId <= 0) return null;
            return await _userProfileRepository.GetOrderDetailsAsync(userId, orderId);
        }

        public async Task<string?> UploadProfileImageAsync(int userId, IFormFile imageFile)
        {
            try
            {
                var currentProfile = await GetProfileByUserIdAsync(userId);
                
                if (!string.IsNullOrEmpty(currentProfile?.ProfileImageUrl))
                {
                    await _files.DeleteProfileImageAsync(currentProfile.ProfileImageUrl, CancellationToken.None);
                }

                var imageUrl = await _files.SaveProfileImageAsync(imageFile, userId, CancellationToken.None);
                
                await _userProfileRepository.UpdateProfileAsync(userId, new PatchProfileRequestDto
                {
                    ProfileImageUrl = imageUrl
                });

                _logger.LogInformation("Uploaded profile image for user {UserId}: {ImageUrl}", userId, imageUrl);
                return imageUrl;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading profile image for user {UserId}", userId);
                throw;
            }
        }

         public async Task<bool> RemoveProfileImageAsync(int userId)
        {
            try
            {
                var currentProfile = await GetProfileByUserIdAsync(userId);
                
                if (!string.IsNullOrEmpty(currentProfile?.ProfileImageUrl))
                {
                    await _files.DeleteProfileImageAsync(currentProfile.ProfileImageUrl, CancellationToken.None);
                    
                    await _userProfileRepository.UpdateProfileAsync(userId, new PatchProfileRequestDto
                    {
                        ProfileImageUrl = null
                    });
                    
                    _logger.LogInformation("Removed profile image for user {UserId}", userId);
                    return true;
                }
                
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error removing profile image for user {UserId}", userId);
                throw;
            }
        }

    public async Task PutUpdateProfileWithImageAsync(
    int userId, 
    UpdateProfileRequestDto dto, 
    IFormFile? profileImage = null,
    bool? removeProfileImage = false,
    CancellationToken ct = default)
    {
        string? imageUrl = dto.ProfileImageUrl;
    
        if (profileImage != null)
        {
            imageUrl = await UploadProfileImageAsync(userId, profileImage, ct);
        }
        else if (removeProfileImage == true)
        {
            await RemoveProfileImageAsync(userId, ct);
            imageUrl = null;
        }
    
        var updateDto = new UpdateProfileRequestDto
        {
            FullName = dto.FullName,
            Phone = dto.Phone,
            Address = dto.Address,
            City = dto.City,
            Status = dto.Status,
            DateOfBirth = dto.DateOfBirth,
            Gender = dto.Gender,
            Bio = dto.Bio,
            ProfileImageUrl = imageUrl
        };
    
        await _userProfileRepository.PutUpdateProfileAsync(userId, updateDto);
    }

    public async Task<string?> UploadProfileImageAsync(int userId, IFormFile imageFile, CancellationToken ct = default)
    {
        try
        {
            var currentProfile = await GetProfileByUserIdAsync(userId);
        
            if (!string.IsNullOrEmpty(currentProfile?.ProfileImageUrl))
            {
                await _files.DeleteProfileImageAsync(currentProfile.ProfileImageUrl, ct);
            }

            var imageUrl = await _files.SaveProfileImageAsync(imageFile, userId, ct);
        
            await _userProfileRepository.UpdateProfileAsync(userId, new PatchProfileRequestDto
            {
                ProfileImageUrl = imageUrl
            });

            _logger.LogInformation("Uploaded profile image for user {UserId}: {ImageUrl}", userId, imageUrl);
            return imageUrl;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading profile image for user {UserId}", userId);
            throw;
        }
    }

        public async Task<bool> RemoveProfileImageAsync(int userId, CancellationToken ct = default)
        {
        try
        {
            var currentProfile = await GetProfileByUserIdAsync(userId);
        
            if (!string.IsNullOrEmpty(currentProfile?.ProfileImageUrl))
            {
                await _files.DeleteProfileImageAsync(currentProfile.ProfileImageUrl, ct);
            
                await _userProfileRepository.UpdateProfileAsync(userId, new PatchProfileRequestDto
                {
                    ProfileImageUrl = null
                });
            
                _logger.LogInformation("Removed profile image for user {UserId}", userId);
                return true;
            }
        
            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error removing profile image for user {UserId}", userId);
            throw;
        }
    }
}
}
