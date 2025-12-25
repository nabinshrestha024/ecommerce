namespace EcommerceProject.Models.DTOs.ShoppingCart
{
    public class CartItemDto
    {
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;

        public string ProductImageUrl { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime AddedDate { get; set; }
    }
}
