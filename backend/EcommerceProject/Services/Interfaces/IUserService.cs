using EcommerceProject.Models.DTOs.User;
using EcommerceProject.Models.Entities;

namespace EcommerceProject.Services.Interfaces
{
    public interface IUserService
    {
        Task<User> GetUserByEmailAsync(string email,bool IsLogin);

        Task<User?> GetUserByIdAsync(int userId);
        Task<UserDetailWithOrderSummaryDto?> GetUsersByIdAsync(int userId);
        Task<IEnumerable<User>> GetAllUsersAsync();

        Task UpdateUserAsync(int userId, UpdateUserDto dto);

        Task DeleteUserAsync(int userId);

        Task<(IEnumerable<UserPagedOrderSummaryDto>, int)> GetAllUsersPagedAsync(int pageNumber, int pageSize);
        Task ResetPasswordAsync(int userId, string newPassword);



    }
}
