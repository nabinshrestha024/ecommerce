using EcommerceProject.Models.DTOs.Cart;

namespace EcommerceProject.Services.Interfaces
{
    public interface IDiscountService
    {
        Task<decimal> ApplyDiscountsAsync(int userId, CartItemDto cartItem);

    }
}
