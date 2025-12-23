using EcommerceProject.Models.DTOs.Payment;

namespace EcommerceProject.Services.Interfaces
{
    public interface ICheckoutService
    {
        CheckoutResponseDto Checkout(int userId, CheckoutRequestDto dto);
    }
}

