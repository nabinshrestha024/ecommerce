namespace EcommerceProject.Models.DTOs.PurchaseOrder
{
    public class PurchaseOrderItemDto
    {
        public int POItemId { get; set; }
        public int POId { get; set; }
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? SKU { get; set; }
        public int Quantity { get; set; }
        public decimal UnitCost { get; set; }
        public decimal ItemTotal => Quantity * UnitCost;
    }
}