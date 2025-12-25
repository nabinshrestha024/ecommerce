namespace EcommerceProject.Models.Entities
{
    public class EsewaPayment
    {
        public int PaymentId { get; set; }
        public int OrderId { get; set; }
        public string PaymentStatus { get; set; }
        public decimal Amount { get; set; }
        public string TransactionUUID { get; set; }
    }
}
