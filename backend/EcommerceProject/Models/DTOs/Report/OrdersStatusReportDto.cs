namespace EcommerceProject.Models.DTOs.Report
{
    public class OrdersStatusReportDto
    {
        public int TotalOrders { get; set; }
        public int Pending { get; set; }
        public int Shipped { get; set; }
        public int Delivered { get; set; }
        public int Cancelled { get; set; }
    }
}