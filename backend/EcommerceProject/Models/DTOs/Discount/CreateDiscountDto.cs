namespace EcommerceProject.Models.DTOs.Discount
{
    public class CreateDiscountDto
    {
        public string DiscountName { get; set; } 
        public string DiscountType { get; set; }          // "Percentage" or "Flat"
        public decimal DiscountValue { get; set; }       
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
