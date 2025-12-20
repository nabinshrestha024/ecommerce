using EcommerceProject.Models.DTOs.Profile;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;

namespace EcommerceProject.Services.Implementations
{
    public class UserProfileService : IUserProfileService
    {
        private readonly IUserProfileRepository _userProfileRepository;

        public UserProfileService(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        public async Task<ProfileResponseDto?> GetProfileByUserIdAsync(int userId)
        {
            if(userId <= 0)
            {
                throw new UnauthorizedAccessException("Invalid user ID.");
            }

            var profile = await _userProfileRepository.GetProfileByUserIdAsync(userId);

            if(profile == null)
            {
                throw new KeyNotFoundException("User profile not found.");
            }   

            return profile;
        }
    }
}