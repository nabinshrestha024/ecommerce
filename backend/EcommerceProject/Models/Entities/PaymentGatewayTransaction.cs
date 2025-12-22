namespace EcommerceProject.Models.Entities
{
    public class PaymentGatewayTransaction
    {
        public int Id { get; set; }
        public string? GatewayName { get; set; }
        public int PaymentId { get; set; }
        public string? TransactionId { get; set; }
        public decimal Amount { get; set; }
        public string? Status { get; set; }
        public string? GatewayStatus { get; set; }
    }
}