namespace EcommerceProject.Models.DTOs.Cart
{
    public class CartItemDto
    {
        public int CartItemId { get; set; }
        public  int UserId { get; set; }

        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public decimal ProductPrice { get; set; }
        public int Quantity { get; set; }
    }
}
