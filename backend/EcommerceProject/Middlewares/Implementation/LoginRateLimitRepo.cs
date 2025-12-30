using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Middlewares.Interface;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.IdentityModel.Tokens.Experimental;
using System.Data;
using System.Threading.Tasks;

namespace EcommerceProject.Middlewares.Implementation
{
    public class LoginRateLimitRepo : ILoginRateLimitRepo
    {
        private readonly ISqlConnectionFactory _connectionFactory;


        public LoginRateLimitRepo(ISqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<bool> IsLockedAsync(string email, string ip)
        {
            using var connection = _connectionFactory.CreateConnection();

            return await connection.ExecuteScalarAsync<bool>(
                "sp_LoginRate_IsLocked",
                new { Email = email, IpAddress = ip },
                commandType: CommandType.StoredProcedure);
        }

        public async Task RegisterFailureAsync(string email, string ip)
        {
            using var connection = _connectionFactory.CreateConnection();

            await connection.ExecuteAsync(
            "sp_LoginRate_CheckAndFail",
            new { Email = email, IpAddress = ip },
            commandType: CommandType.StoredProcedure
        );
        }


        public async Task ResetAsync(string email, string ip)
        {
            using var connection = _connectionFactory.CreateConnection();

            await connection.ExecuteAsync(
                "sp_LoginRate_Reset",
                new { Email = email, IpAddress = ip },
                commandType: CommandType.StoredProcedure);

        }
    }
}
