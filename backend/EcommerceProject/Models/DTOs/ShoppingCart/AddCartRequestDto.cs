namespace EcommerceProject.Models.DTOs.ShoppingCart
{
    public class AddCartRequestDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
