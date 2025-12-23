namespace EcommerceProject.Models.DTOs.Profile
{
   public class UserOrdersDto
    {
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string? Status { get; set; }
        public string? PaymentStatus { get; set; }
    }
}