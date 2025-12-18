using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.Entities;
using EcommerceProject.Services.Interfaces;
using Microsoft.Data.SqlClient;
using System.Data;

namespace EcommerceProject.Services.Implementations
{
    public class UserService :IUserService
    {
        private readonly ISqlConnectionFactory _connectionFactory;

        public UserService(ISqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            using var connection = _connectionFactory.CreateConnection();
            var user = await connection.QueryFirstOrDefaultAsync<User>(
                "spUser_GetUserByEmail",
                new { Email = email },
                commandType: CommandType.StoredProcedure
                );
            return user;
        }



        public async Task<User> GetUserByIdAsync(int userId)
        {
            using var connection = _connectionFactory.CreateConnection();
            var user = await connection.QueryFirstOrDefaultAsync<User>(
                "spUser_GetUserById",
                new { UserId = userId },
                commandType: CommandType.StoredProcedure
                );
            return user;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            using var connection = _connectionFactory.CreateConnection();
            if (connection == null)
                throw new InvalidOperationException("Database connection is not available.");

            var users = await connection.QueryAsync<User>(
                "spUser_GetAllUsers",              
                commandType: CommandType.StoredProcedure
            );

            return users;
        }

    }
}
