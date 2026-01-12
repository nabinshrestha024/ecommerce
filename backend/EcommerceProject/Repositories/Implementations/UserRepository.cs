using System.Data;
using System.Runtime.InteropServices.Marshalling;
using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.User;
using EcommerceProject.Models.Entities;
using EcommerceProject.Repositories.Interfaces;
using Microsoft.AspNetCore.Connections;
using Microsoft.Data.SqlClient;
using Org.BouncyCastle.Crypto.Prng;

namespace EcommerceProject.Repositories.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly ISqlConnectionFactory _factory;

        public UserRepository(ISqlConnectionFactory factory)
        {
            _factory = factory;
        }


        public async Task<User?> GetUserByEmailAsync(string email)
        {


            try
            {
                using var connection = _factory.CreateConnection();

                return await connection.QueryFirstOrDefaultAsync<User>(
                    "dbo.spUser_GetUserByEmail",
                    new { Email = email },
                    commandType: CommandType.StoredProcedure
                );
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.Number);
                throw;
            }
        }

        public async Task<User?> GetUserByIdAsync(int userId)
        {
            using var conn = _factory.CreateConnection();

            return await conn.QueryFirstOrDefaultAsync<User?>(
                "spUser_GetUserById",
                new { UserId = userId },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<UserDetailWithOrderSummaryDto?> GetUsersByIdAsync(int userId)
        {
            using var con = _factory.CreateConnection();

            return await con.QueryFirstOrDefaultAsync<UserDetailWithOrderSummaryDto>(
                "spUsers_GetByIdWithOrderSummary",
                new { UserId = userId },
                commandType: CommandType.StoredProcedure
            );
        }


        public async Task<IEnumerable<User>> GetAllUserAsync()
        {
            using var connection = _factory.CreateConnection();
            return await connection.QueryAsync<User>(
                "spUser_GetAllUsers",
                commandType: CommandType.StoredProcedure);
        }


        public async Task UpdateUserAsync(int userId, UpdateUserDto dto)
        {
            using var conn = _factory.CreateConnection();

            await conn.ExecuteAsync(
                "spUser_UpdateUser",
                new
                {
                    UserId = userId,
                    dto.FullName,
                    dto.Role,
                    dto.Phone,
                    dto.Address,
                    dto.IsActive
                },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task UpdatePasswordAsync(int userId, string passwordHash)
        {
            using var conn = _factory.CreateConnection();
            await conn.ExecuteAsync(
                "spUser_UpdatePassword",
                new
                {
                    UserId = userId,
                    PasswordHash = passwordHash

                },
                commandType:CommandType.StoredProcedure);
        }
        public async Task DeleteUserAsync(int userId)
        {
            using var conn = _factory.CreateConnection();
            await conn.ExecuteAsync(
                "spUser_DeleteUser",
                new { UserId = userId },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<(IEnumerable<UserPagedOrderSummaryDto>, int)> GetAllUsersPagedAsync(int PageNumber, int pageSize)
        {
            using var connection = _factory.CreateConnection();
            using var multi = await connection.QueryMultipleAsync(
                "spUsers_GetPagedWithOrderSummary",
                new { PageNumber = PageNumber, pageSize = pageSize },
                commandType: CommandType.StoredProcedure);

            var users = await multi.ReadAsync<UserPagedOrderSummaryDto>();

            var totalCount = await multi.ReadFirstAsync<int>();

            return (users, totalCount);
        }
    }
}
