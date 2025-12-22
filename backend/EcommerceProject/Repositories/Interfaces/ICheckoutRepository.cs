using EcommerceProject.Models.DTOs.Payment;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface ICheckoutRepository
    {
        int CreateOrder(int userId, CheckoutRequestDto dto);
    }
}