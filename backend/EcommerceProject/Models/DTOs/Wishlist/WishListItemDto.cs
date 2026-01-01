namespace EcommerceProject.Models.DTOs.Wishlist
{
    public class WishListItemDto
    {
        public int WishlistId { get; set; }

        public int ProductId { get; set; }
        public int VariantId { get; set; }


        public string ProductName { get; set; }

        public string Slug { get; set; }

        public string Description { get; set; }

        public string ProductImageUrl { get; set; }


        public decimal Price { get; set; } 

        public DateTime AddedDate { get; set; }


    }
}
