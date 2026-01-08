namespace EcommerceProject.Models.DTOs.ShoppingCart
{
    public class CheckoutsResponseDto
    {
        public int OrderId { get; set; }
        public decimal FinalPrice { get; set; }

        public decimal DiscountTotal { get; set; }

        public decimal TotalDiscount { get; set; }

        public decimal TotalAmount { get; set; }

        public decimal GrandTotal { get; set; }

    }
}
