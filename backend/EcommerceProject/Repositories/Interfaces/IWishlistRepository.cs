using EcommerceProject.Models.DTOs.Wishlist;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IWishlistRepository
    {

        Task<PagedResult<WishListItemDto>> GetPagedAsync(int userId, int page, int size);     
        Task AddWishlistItem(int userId, int productId);


        Task DeleteWishlistItem(int userId, int productId);

        Task MoveToCartAsync(int userId, int ProductId);
    }
}
