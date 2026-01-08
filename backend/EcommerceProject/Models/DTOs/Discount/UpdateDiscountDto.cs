namespace EcommerceProject.Models.DTOs.Discount
{
    public class UpdateDiscountDto
    {
        public int DiscountId { get; set; }
        public string DiscountName { get; set; }
        public string DiscountType { get; set; }
        public decimal DiscountValue { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
    }
}
