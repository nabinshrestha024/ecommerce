using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.User;
using EcommerceProject.Models.Entities;
using EcommerceProject.Repositories.Interfaces;
using Microsoft.AspNetCore.Connections;
using System.Data;

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
            using var connection = _factory.CreateConnection();
            return await connection.QueryFirstOrDefaultAsync<User>(
                "spUser_GetUserByEmail",
                new { Email = email },
                commandType: CommandType.StoredProcedure);
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

            string? passwordHash = null;
            if (!string.IsNullOrEmpty(dto.PasswordHash))
            {
                passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.PasswordHash);
            }

            await conn.ExecuteAsync(
                "spUser_UpdateUser",
                new
                {
                    UserId = userId,
                    dto.FullName,
                    PasswordHash = passwordHash,
                    dto.Phone,
                    dto.Address,
                    dto.City,
                    dto.IsActive
                },
                commandType: CommandType.StoredProcedure
            );
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

        public async Task<(IEnumerable<User> Users, int TotalCount)> GetAllUsersPagedAsync(int pageNumber, int pageSize)
        {
            using var connection = _factory.CreateConnection();

            using var multi = await connection.QueryMultipleAsync(
                "spUser_GetAllUsersPaged",
                new { PageNumber = pageNumber, PageSize = pageSize },
                commandType: CommandType.StoredProcedure
            );

            var users = multi.Read<User>();
            var totalCount = multi.ReadFirst<int>();

            return (users, totalCount);
        }

    }
}
