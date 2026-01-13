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

        public async Task PutUpdateProfileAsync(int userId, UpdateProfileRequestDto dto)
        {
            await _dbConnection.ExecuteAsync(
                "spProfile_PutUpdate",
            new
            {
                UserId = userId,
                dto.FullName,
                //dto.Phone,  // remove it
                dto.Address,
                dto.City,
                // dto.ProfileImageUrl,
                //DateOfBirth = dto.DateOfBirth.HasValue // remove it
            //? dto.DateOfBirth.Value.ToDateTime(TimeOnly.MinValue)
            //: (DateTime?)null,
                //Gender = dto.Gender?.ToString(), // remove it
                dto.Bio,
            },
            commandType: CommandType.StoredProcedure);
        }
        public async Task RemoveProfileImageAsync(int userId)
        {
            await _dbConnection.ExecuteAsync(
                "spProfile_RemoveImage",
                new { UserId = userId },
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateProfileImageAsync(int userId, string profileImageUrl)
        {
            await _dbConnection.ExecuteAsync(
                "spProfile_UpdateImage",
                new
                {
                    UserId = userId,
                    ProfileImageUrl = profileImageUrl
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<UserSocialLinkDto>> GetSocialLinksAsync(int userId)
            => await _dbConnection.QueryAsync<UserSocialLinkDto>(
                "spProfile_GetSocialLinks",
                new { UserId = userId },
                commandType: CommandType.StoredProcedure);

        public async Task<int> AddSocialLinkAsync(
    int userId,
    UpsertUserSocialLinkRequestDto dto)
        {
            int socialLinkId = await _dbConnection.QuerySingleAsync<int>(
                "spProfile_PostSocialLink",
                new
                {
                    UserId = userId,
                    dto.Platform,
                    ProfileLinkUrl = dto.ProfileLinkUrl
                },
                commandType: CommandType.StoredProcedure
            );

            return socialLinkId;
        }


        public async Task UpdateSocialLinkAsync(int socialLinkId, UpsertUserSocialLinkRequestDto dto)
        => await _dbConnection.ExecuteAsync(
            "spProfile_PutSocialLink",
            new { SocialLinkId = socialLinkId, dto.Platform, dto.ProfileLinkUrl },
            commandType: CommandType.StoredProcedure);

        public async Task DeleteSocialLinkAsync(int socialLinkId)
        => await _dbConnection.ExecuteAsync(
            "spProfile_DeleteSocialLink",
            new { SocialLinkId = socialLinkId },
            commandType: CommandType.StoredProcedure);

}
}