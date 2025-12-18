namespace EcommerceProject.Models.DTOs.Stock
{
    public class StockAdjustmentResultDto
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public int AdjustmentQuantity { get; set; }
        public int PreviousStock { get; set; }
        public int NewStockLevel { get; set; }
        public string? Reason { get; set; }
        public string? Notes { get; set; }
        public int AdjustedBy { get; set; }
        public DateTime AdjustedAt { get; set; }
    }
}