namespace EcommerceProject.Models.DTOs.Discount
{
    public class CreateDiscountDto
    {
        public int ProductId { get; set; }
        public string DiscountType { get; set; }

        public decimal DiscountValue { get; set; }

        public bool IsPercentage { get; set; }

        public int? MinQuantity { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int? MaxUsage { get; set; }

        public int? PerUserLimit { get; set; }
    }
}
