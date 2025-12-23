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
                dto.Phone,
                dto.Address,
                dto.City,
                dto.ProfileImageUrl,
                dto.DateOfBirth,
                dto.Gender,
                dto.Bio,
                dto.Status
            },
            commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateProfileAsync(int userId, PatchProfileRequestDto dto)
        {
            await _dbConnection.ExecuteAsync(
                "spProfile_PatchUpdate",
            new
            {
                UserId = userId,
                dto.FullName,
                dto.Phone,
                dto.Address,
                dto.City,
                dto.ProfileImageUrl,
                dto.Status,
                dto.DateOfBirth,
                dto.Gender,
                dto.Bio
            },
            commandType: CommandType.StoredProcedure
            );
        }

        public async Task ChangePasswordAsync(int userId, string passwordHash)
        {
            await _dbConnection.ExecuteAsync(
                "spProfile_ChangePassword",
            new { UserId = userId, PasswordHash = passwordHash },
            commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<UserSocialLinkDto>> GetSocialLinksAsync(int userId)
            => await _dbConnection.QueryAsync<UserSocialLinkDto>(
                "spProfile_GetSocialLinks",
                new { UserId = userId },
                commandType: CommandType.StoredProcedure);

        public async Task AddSocialLinkAsync(int userId, UserSocialLinkDto dto)
            => await _dbConnection.ExecuteAsync(
                "spProfile_PostSocialLink",
                new { UserId = userId, dto.Platform, dto.ProfileUrl },
                commandType: CommandType.StoredProcedure);

        public async Task UpdateSocialLinkAsync(int socialLinkId, UserSocialLinkDto dto)
        => await _dbConnection.ExecuteAsync(
            "spProfile_PutSocialLink",
            new { SocialLinkId = socialLinkId, dto.Platform, dto.ProfileUrl },
            commandType: CommandType.StoredProcedure);

        public async Task DeleteSocialLinkAsync(int socialLinkId)
        => await _dbConnection.ExecuteAsync(
            "spProfile_DeleteSocialLink",
            new { SocialLinkId = socialLinkId },
            commandType: CommandType.StoredProcedure);

        public async Task<IEnumerable<UserOrdersDto>> GetOrdersAsync(int userId)
            => await _dbConnection.QueryAsync<UserOrdersDto>(
                "spOrders_GetByUserId",
                new { UserId = userId },
                commandType: CommandType.StoredProcedure);
    
        public async Task<UserOrderDetailsDto?> GetOrderDetailsAsync(int userId, int orderId)
        {
            return await _dbConnection.QueryFirstOrDefaultAsync<UserOrderDetailsDto>(
                "spOrders_GetDetailsByUserIdAndOrderId",
                new { UserId = userId, OrderId = orderId },
                commandType: CommandType.StoredProcedure);
        }


}
}