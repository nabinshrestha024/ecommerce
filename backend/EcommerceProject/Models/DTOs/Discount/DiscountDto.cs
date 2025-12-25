namespace EcommerceProject.Models.DTOs.Discount
{
    public class DiscountDto
    {

        public int DiscountId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal Percentage { get; set; }
        public bool IsActive { get; set; }
    }
}
