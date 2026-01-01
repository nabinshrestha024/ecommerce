using EcommerceProject.Models.DTOs.User;
using EcommerceProject.Models.Entities;
using EcommerceProject.Services.Interfaces;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;


namespace EcommerceProject.Services.Implementations
{
    public class EmailService : IEmailService
    {

        private readonly EmailSettings emailsettings;

        public EmailService(IOptions<EmailSettings> options)
        {
            emailsettings = options.Value;
        }

        public async Task SendEmail(MailRequest mailRequest)
        {
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress(emailsettings.Email);
            mail.To.Add(mailRequest.Email);
            mail.CC.Add(mailRequest.Email);
            mail.Subject = mailRequest.Subject;
            mail.Body = mailRequest.Emailbody;

            SmtpClient smtp = new SmtpClient(emailsettings.Host, emailsettings.Port);
            smtp.Credentials = new NetworkCredential(emailsettings.Email, emailsettings.Password);
            smtp.EnableSsl = true; // Use SSL/TLS

            smtp.SendMailAsync(mail);


        }
    }
}
