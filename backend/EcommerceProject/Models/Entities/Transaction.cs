namespace EcommerceProject.Models.Entities
{
    public class Transaction
    {
        public long TransactionId { get; set; }
        public int OrderId { get; set; }
        public int? PaymentId { get; set; }
        public string? Type { get; set; } 
        public decimal Amount { get; set; }
        public string? Status { get; set; }
        public string? Reference { get; set; }
    }
}