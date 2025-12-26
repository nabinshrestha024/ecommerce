namespace EcommerceProject.Models.DTOs.Report
{
    public class CategorySalesDto
    {
        public string CategoryName { get; set; }

        public int QuantitySold { get; set; }


        public decimal TotalRevenue { get; set; }
    }
}
