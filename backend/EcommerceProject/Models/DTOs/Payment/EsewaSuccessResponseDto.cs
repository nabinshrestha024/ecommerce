namespace EcommerceProject.Models.DTOs.Payment
{
    public class EsewaSuccessResponseDto
    {
        public string? TransactionCode { get; set; }
        public string? Status { get; set; }
        public decimal? TotalAmount { get; set; }
        public string? TransactionUuid { get; set; }
        public string? ProductCode { get; set; }
        public string? Signature { get; set; }
    }
}