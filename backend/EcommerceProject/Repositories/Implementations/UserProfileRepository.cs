using Dapper;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Models.DTOs.Profile;
using System.Data;

namespace EcommerceProject.Repositories.Implementations
{
    public class UserProfileRepository: IUserProfileRepository
    {
        private readonly IDbConnection _dbConnection;

        public UserProfileRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<ProfileResponseDto?> GetProfileByUserIdAsync(int userId)
        {
            using var multi = _dbConnection.QueryMultipleAsync(
                "spProfile_GetByUserId",
                new { UserId = userId },
                commandType: CommandType.StoredProcedure
            );

            var profile = await multi.Result.ReadFirstOrDefaultAsync<ProfileResponseDto>();
            if (profile == null)
            {
                return null;
            }

            var socialLinks = (await multi.Result.ReadAsync<UserSocialLinkDto>()).ToList();
            profile.SocialLinks = socialLinks;
            return profile;
        }
    }
}