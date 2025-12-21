// using EcommerceProject.Models.DTOs.Profile;
// using EcommerceProject.Repositories.Interfaces;
// using EcommerceProject.Services.Interfaces;

// namespace EcommerceProject.Services.Implementations
// {
//     public class UserProfileService : IUserProfileService
//     {
//         private readonly IUserProfileRepository _userProfileRepository;

//         public UserProfileService(IUserProfileRepository userProfileRepository)
//         {
//             _userProfileRepository = userProfileRepository;
//         }

//         public async Task<ProfileResponseDto?> GetProfileByUserIdAsync(int userId)
//         {
//             if(userId <= 0)
//             {
//                 throw new UnauthorizedAccessException("Invalid user ID.");
//             }

//             var profile = await _userProfileRepository.GetProfileByUserIdAsync(userId);

//             if(profile == null)
//             {
//                 throw new KeyNotFoundException("User profile not found.");
//             }   

//             return profile;
//         }

//         public async Task PutUpdateProfileAsync(int userId, UpdateProfileRequestDto dto)
//         {
//             await _userProfileRepository.PutUpdateProfileAsync(userId, dto);
//         }

//         public async Task UpdateProfileAsync(int userId, PatchProfileRequestDto dto)
//         {
//             if (userId <= 0)
//                 throw new UnauthorizedAccessException("Invalid user context.");
//             await _userProfileRepository.UpdateProfileAsync(userId, dto);
//         }


//         public async Task ChangePasswordAsync(int userId, ChangePasswordRequestDto dto)
//         {
//             // get existing hash (you likely already have a repo method for this)
//             var profile = await _userProfileRepository.GetProfileByUserIdAsync(userId);

//             if (profile == null)
//                 throw new KeyNotFoundException("User not found");

//             if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, profile.PasswordHash))
//                 throw new UnauthorizedAccessException("Current password is incorrect");

//             var newHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
//             await _userProfileRepository.ChangePasswordAsync(userId, newHash);
//         }


//     }    
// }


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

        // -------------------- PROFILE --------------------

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

        // -------------------- PASSWORD --------------------

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

        // -------------------- SOCIAL LINKS --------------------

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

        // -------------------- ORDERS (CUSTOMER SIDE) --------------------

        public async Task<IEnumerable<UserOrdersDto>> GetUserOrdersAsync(int userId)
        {
            if (userId <= 0)
                throw new UnauthorizedAccessException("Invalid user context.");

            return await _userProfileRepository.GetOrdersAsync(userId);
        }

        public async Task<UserOrderDetailsDto?> GetOrderDetailsAsync(int userId, int orderId)
        {
            if (userId <= 0)
                throw new UnauthorizedAccessException("Invalid user context.");

            if (orderId <= 0)
                throw new ArgumentException("Invalid order ID.");

            var order = await _userProfileRepository.GetOrderDetailsAsync(userId, orderId);

            if (order == null)
                throw new KeyNotFoundException("Order not found.");

            return order;
        }
    }
}
