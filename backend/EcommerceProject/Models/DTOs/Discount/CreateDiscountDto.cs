namespace EcommerceProject.Models.DTOs.Discount
{
    public class CreateDiscountDto
    {
        public int ProductId { get; set; }

        public decimal Percentage { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int? MaxUsage { get; set; }
        public int? PerUserLimit { get; set; }
    }
}
