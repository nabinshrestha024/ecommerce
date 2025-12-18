namespace EcommerceProject.Models.DTOs.Stock
{
    public class StockDto
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? SKU { get; set; }
        public int CurrentStock { get; set; }
        public int ReorderLevel { get; set; }
        public bool IsLowStock => CurrentStock <= ReorderLevel;
        public string? Status => IsLowStock ? "Low Stock" : "In Stock";
        public decimal? Price { get; set; }
        public string? CategoryName { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}