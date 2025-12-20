namespace EcommerceProject.Models.DTOs.Wishlist
{
    public class WishListItemDto
    {
        public int WishlistItemId { get; set; }

        public int UserId { get; set; }

        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public decimal ProductPrice { get; set; } 


    }
}
