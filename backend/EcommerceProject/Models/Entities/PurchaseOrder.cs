namespace EcommerceProject.Models.Entities
{
    public class PurchaseOrder
    {
        public int POId { get; set; }
        public int VendorId { get; set; }
        public DateTime OrderDate { get; set; }
        public string Status { get; set; } = "Pending"; // Pending, Approved, Received, Cancelled
        public decimal? TotalAmount { get; set; }
        public string? Notes { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        
        public Vendor? Vendor { get; set; }
    }
}