namespace EcommerceProject.Middlewares.Interface
{
    public interface ILoginRateLimitRepo
    {
        Task <bool> IsLockedAsync(string email, string ip);

        Task RegisterFailureAsync(string email, string ip);

        Task ResetAsync(string email, string ip);

    }
}
