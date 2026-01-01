using EcommerceProject.Models.DTOs.User;

namespace EcommerceProject.Services.Interfaces
{
    public interface IEmailService
    {
       
        Task SendEmail(MailRequest mailrequest);

    }
}
