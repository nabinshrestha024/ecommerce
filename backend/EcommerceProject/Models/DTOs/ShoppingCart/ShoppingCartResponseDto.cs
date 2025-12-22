using EcommerceProject.Models.Entities;

namespace EcommerceProject.Models.DTOs.Cart
{
    public class ShoppingCartResponseDto
    {
        public IEnumerable<ShoppingCartItem> Items { get; set; } = new List<ShoppingCartItem>();
        public decimal SubTotal { get; set; }
        public decimal Discount { get; set; }
        public decimal GrandTotal { get; set; }

    }
}
