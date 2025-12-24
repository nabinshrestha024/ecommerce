namespace EcommerceProject.Models.DTOs.ShoppingCart
{
    public class AddCartRequestDto
    {
        public string ProductName { get; set; } = string.Empty;
        public int Quantity { get; set; }
    }
}
