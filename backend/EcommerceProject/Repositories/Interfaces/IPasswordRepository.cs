namespace EcommerceProject.Repositories.Interfaces
{
    public interface IPasswordRepository
    {
        Task SaveTokenAsync(int userId, string token, DateTime expiry);
        Task ResetPasswordAsync(string token, string newPasswordHash);
    }
}
