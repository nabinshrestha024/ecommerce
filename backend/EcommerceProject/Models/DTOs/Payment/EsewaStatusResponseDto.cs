namespace EcommerceProject.Models.DTOs.Payment
{
    public class EsewaStatusResponseDto
    {
        public string? ProductCode { get; set; }
        public string? TransactionUuid { get; set; }
        public decimal? TotalAmount { get; set; }
        public string? Status { get; set; }
        public string? RefId { get; set; }
    }
}  