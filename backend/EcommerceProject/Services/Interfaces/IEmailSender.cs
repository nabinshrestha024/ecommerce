namespace EcommerceProject.Services.Interfaces
{
    public interface IEmailSender
    {
        Task SendAsync(string toEmail, string subject, string body, CancellationToken ct);
    }
}
