namespace EcommerceProject.Models.DTOs.Report
{
    public class SalesByCategoryDto
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public decimal TotalSales { get; set; }
    }
}
