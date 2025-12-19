namespace EcommerceProject.Models.DTOs.Stock
{
        public class LowStockAlertDto
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? SKU { get; set; }
        public int CurrentStock { get; set; }
        public int ReorderLevel { get; set; }
        public int NeededQuantity => ReorderLevel * 2 - CurrentStock; // calculation
        public string? CategoryName { get; set; }
        public DateTime LastSoldDate { get; set; }
    }
}