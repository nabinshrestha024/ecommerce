namespace EcommerceProject.Models.DTOs.Wishlist
{
    public class WishListItemDto
    {
        public int WishlistId { get; set; }

        public int UserId { get; set; }

        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public decimal ProductPrice { get; set; } 


    }
}
