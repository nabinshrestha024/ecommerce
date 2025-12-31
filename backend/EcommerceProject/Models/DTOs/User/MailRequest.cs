namespace EcommerceProject.Models.DTOs.User
{
    public class MailRequest
    {
        public string Email { get; set;}
        public string Subject { get; set; }
        public string Emailbody { get; set; }

        public bool IsHtml { get; set; }
    }
}
