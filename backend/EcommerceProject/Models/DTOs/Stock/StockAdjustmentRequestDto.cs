namespace EcommerceProject.Models.DTOs.Stock
{
 public class StockAdjustmentRequestDto
    {
        public int ProductId { get; set; }

        public int VariantId { get; set; }
        public int AdjustmentQuantity { get; set; }
        public string? Reason { get; set; }
        public string? Notes { get; set; }
    }
}