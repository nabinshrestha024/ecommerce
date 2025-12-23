using EcommerceProject.Services.Interfaces;

namespace EcommerceProject.Services.Implementations
{
    public class EmailSender : IEmailSender
    {
        public Task SendAsync(string toEmail, string subject, string body, CancellationToken ct)
        {
            return Task.CompletedTask;
        }
    }
}
