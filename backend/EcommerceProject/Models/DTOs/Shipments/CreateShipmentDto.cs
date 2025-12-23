namespace EcommerceProject.Models.DTOs.Shipments
{
    public class CreateShipmentDto
    {
        public int OrderId { get; set; }
        public decimal? ShippingCost { get; set; }
        public string? Notes { get; set; }
    }
}
