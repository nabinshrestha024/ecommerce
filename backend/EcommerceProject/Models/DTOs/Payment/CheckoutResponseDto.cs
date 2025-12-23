namespace EcommerceProject.Models.DTOs.Payment
{
    public class CheckoutResponseDto
    {
        public int OrderId { get; set; }
        public string? RedirectUrl { get; set; }
    }
}