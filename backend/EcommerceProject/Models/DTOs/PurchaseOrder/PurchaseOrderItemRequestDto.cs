namespace EcommerceProject.Models.DTOs.PurchaseOrder
{
    public class PurchaseOrderItemRequestDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitCost { get; set; }
    }   
}