using EcommerceProject.Models.DTOs.Cart;
using EcommerceProject.Models.Entities;

namespace EcommerceProject.Services.Interfaces
{
    public interface IDiscountService
    {
        Task<decimal> ApplyDiscountsAsync(int userId, ShoppingCartItem cartItem);

    }
}
