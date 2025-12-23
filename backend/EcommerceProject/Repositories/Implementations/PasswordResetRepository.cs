using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Repositories.Interfaces;
using System.Data;

namespace EcommerceProject.Repositories.Implementations
{
    public class PasswordResetRepository : IPasswordRepository
    {
        private readonly ISqlConnectionFactory _connectionFactory;

        public PasswordResetRepository(ISqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task SaveTokenAsync(int userId, string token, DateTime expiry)
        {
            using var connection = _connectionFactory.CreateConnection();
            await connection.ExecuteAsync(
                "spPasswordReset_Save",
                new { UserId = userId, Token = token, Expiry = expiry },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task ResetPasswordAsync(string token, string newPasswordHash)
        {
            using var connection = _connectionFactory.CreateConnection();
            await connection.ExecuteAsync(
                "spPasswordReset_Reset",
                new { Token = token, NewPasswordHash = newPasswordHash },
                commandType: CommandType.StoredProcedure
            );
        }
    }

}
