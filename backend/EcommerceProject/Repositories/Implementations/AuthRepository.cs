using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.Entities;
using EcommerceProject.Repositories.Interfaces;
using System.Data;

namespace EcommerceProject.Repositories.Implementations
{
    public class AuthRepository : IAuthRepository
    {
        private readonly ISqlConnectionFactory _sqlConnectionFactory;

        public AuthRepository(ISqlConnectionFactory sqlConnectionFactory)
        {
            _sqlConnectionFactory = sqlConnectionFactory;
        }

        public async Task SaveRefreshTokenAsync(int userId, string refreshTokenHash, DateTime expiry)
        {
            using var conn = _sqlConnectionFactory.CreateConnection();

            await conn.ExecuteAsync(
                "spUser_SaveRefreshToken",
                new
                {
                    UserId = userId,
                    RefreshToken = refreshTokenHash,
                    Expiry = expiry
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<User?> GetUserByRefreshTokenAsync(string refreshToken)
        {
            using var conn = _sqlConnectionFactory.CreateConnection();
            var user = await conn.QueryFirstOrDefaultAsync<User>(
                "spUser_GetByRefreshToken",
                new { RefreshToken = refreshToken },
                commandType: CommandType.StoredProcedure);
            return user;
        }

        public async Task RotateRefreshTokenAsync(string oldToken, string newToken)
        {
            using var conn = _sqlConnectionFactory.CreateConnection();
            await conn.ExecuteAsync(
                "spUser_RotateRefreshToken",
                new
                {
                    OldRefreshToken = oldToken,
                    NewRefreshToken = newToken
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task RevokeRefreshTokenAsync(int userId)
        {
            using var conn = _sqlConnectionFactory.CreateConnection();
            await conn.ExecuteAsync(
                "spUser_RevokeRefreshToken",
                new { UserId = userId },
                commandType: CommandType.StoredProcedure);
        }

    }
}
