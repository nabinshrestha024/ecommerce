namespace EcommerceProject.Models.DTOs.PurchaseOrder
{
       public class CreatePurchaseOrderRequestDto
    {
        public int VendorId { get; set; }
        public string? Notes { get; set; }
        public List<PurchaseOrderItemRequestDto> Items { get; set; } = new();
    }
}