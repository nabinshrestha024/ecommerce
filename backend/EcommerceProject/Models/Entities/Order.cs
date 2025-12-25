
namespace EcommerceProject.Models.Entities;

    public class Order
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string? Status { get; set; } = "Pending";
        public string? ShippingName { get; set; }
        public string? ShippingAddress { get; set; } = default!;
        public string? ShippingCity { get; set; } = default!;
        public string? ShippingPhone { get; set; } = default!;
        public string? PaymentMethod { get; set; }
        public string? PaymentStatus { get; set; } = "Pending";
        public string? PaymentGateway {  get; set; }
        public string? Notes { get; set; }

        // navigation property
        public virtual ICollection<Payment> Payment { get; set; } = new List<Payment>();
}
