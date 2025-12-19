namespace EcommerceProject.Models.Entities
{
    public class PurchaseOrderItem
    {
        public int POItemId { get; set; }
        public int POId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitCost { get; set; }
    }
}
