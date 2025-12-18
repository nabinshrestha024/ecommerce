namespace EcommerceProject.Models.DTOs.PurchaseOrder
{
    public class PurchaseOrderDetailDto
    {
        public int POId { get; set; }
        public int VendorId { get; set; }
        public string? VendorName { get; set; }
        public string? VendorContact { get; set; }
        public DateTime OrderDate { get; set; }
        public string? Status { get; set; }
        public decimal? TotalAmount { get; set; }
        public string? Notes { get; set; }
        public int? CreatedBy { get; set; }
        public string? CreatedByName { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<PurchaseOrderItemDto> Items { get; set; } = new();
    } 
}    
    
