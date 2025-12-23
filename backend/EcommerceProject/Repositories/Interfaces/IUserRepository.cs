using EcommerceProject.Models.DTOs.User;
using EcommerceProject.Models.Entities;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetUserByEmailAsync(string email);
        Task<User?> GetUserByIdAsync(int userId);

        Task<IEnumerable<User>> GetAllUserAsync();
        Task UpdateUserAsync(int userId, UpdateUserDto dto);

        Task DeleteUserAsync(int userId);

        Task<(IEnumerable<User> Users, int TotalCount)> GetAllUsersPagedAsync(int pageNumber, int pageSize);
    }
}
