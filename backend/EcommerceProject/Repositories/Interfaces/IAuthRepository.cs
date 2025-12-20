using EcommerceProject.Models.Entities;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IAuthRepository
    {
        Task SaveRefreshTokenAsync(int userId, string refreshToken, DateTime expiry);
        Task<User?> GetUserByRefreshTokenAsync(string refreshToken);
        Task RotateRefreshTokenAsync(string oldToken, string newToken);
        Task RevokeRefreshTokenAsync(int userId);
    }
}
