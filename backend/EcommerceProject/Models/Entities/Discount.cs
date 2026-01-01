namespace EcommerceProject.Models.Entities
{
    public class Discount
    {
        public int DiscountId { get; set; }
        public int ProductId { get; set; }
        public int? VariantId { get; set; }

        public string DiscountType { get; set; }
        public decimal DiscountValue { get; set; }
        public bool IsPercentage { get; set; }
        public int? MinQuantity { get; set; }
        public int? MaxUsage { get; set; }
        public int? PerUserLimit { get; set; }
    }
}
