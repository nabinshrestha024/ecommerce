using EcommerceProject.Models.DTOs.Payment;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;

namespace EcommerceProject.Services.Implementations
{
    public class CheckoutService : ICheckoutService
{
    private readonly ICheckoutRepository _repo;
    private readonly IPaymentService _paymentService;

    public CheckoutService(ICheckoutRepository repo, IPaymentService paymentService)
    {
        _repo = repo;
        _paymentService = paymentService;
    }

    public CheckoutResponseDto Checkout(int userId, CheckoutRequestDto dto)
    {
        int orderId = _repo.CreateOrder(userId, dto);

        var esewa = _paymentService.InitiateEsewa(orderId);

        return new CheckoutResponseDto
        {
            OrderId = orderId,
            RedirectUrl = esewa.RedirectUrl
        };
    }
}

}