namespace EcommerceProject.Models.DTOs.Report
{
    public class TopProductDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int QuantitySold { get; set; }
        public decimal TotalSales { get; set; }
    }
}
