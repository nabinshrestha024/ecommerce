namespace EcommerceProject.Models.DTOs.Payment
{
    public class OrderPaymentInfoDto
    {
        public int OrderId { get; set; }
        //public decimal TotalAmount { get; set; } 

        public decimal GrandTotal { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
