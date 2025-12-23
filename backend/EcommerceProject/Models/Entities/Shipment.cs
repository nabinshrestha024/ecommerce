namespace EcommerceProject.Models.Entities
{
    public class Shipment
    {
        public int ShipmentId { get; set; }
        public int OrderId { get; set; }
        public string Status { get; set; } = default!;
        public DateTime ShippedAt { get; set; }
        public DateTime DeliveredAt { get; set; }
        public decimal ShippingCost { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

    }
}
