namespace EcommerceProject.Models.DTOs.EsewaPayment
{
    public class EsewaInitiateResponseDto
    {
        public string PaymentUrl { get; set; }
        public Dictionary<string, string> Fields { get; set; }
    }
}