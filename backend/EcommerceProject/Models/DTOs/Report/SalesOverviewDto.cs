namespace EcommerceProject.Models.DTOs.Report
{
    public class SalesOverviewDto
    {
        public DateTime Date { get; set; }

        public decimal TotalSales { get; set; }

        public int TotalOrders { get; set; }
    }
}
