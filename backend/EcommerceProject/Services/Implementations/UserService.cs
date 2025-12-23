using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.User;
using EcommerceProject.Models.Entities;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using Microsoft.Data.SqlClient;
using System.Data;

namespace EcommerceProject.Services.Implementations
{
    public class UserService :IUserService
    {
       
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            
            _userRepository = userRepository;
        }

        public async Task<User> GetUserByEmailAsync(string email,bool IsLogin)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);

            return user;
        }
        public async Task<User> GetUserByIdAsync(int userId)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            if(user == null)
            {
                throw new KeyNotFoundException("user not found");
            }

            return user;
        }



        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _userRepository.GetAllUserAsync();
        }

        public async Task UpdateUserAsync(int userId, UpdateUserDto dto)
        {
            await _userRepository.UpdateUserAsync(userId, dto);

        }

        public async Task DeleteUserAsync(int userId)
        {
            await GetUserByIdAsync(userId);
            await _userRepository.DeleteUserAsync(userId);
        }

        public async Task<(IEnumerable<User> Users, int TotalCount)> GetAllUsersPagedAsync(int pageNumber, int pageSize)
        {
            return await _userRepository.GetAllUsersPagedAsync(pageNumber, pageSize);
        }


    }
}
