using EcommerceProject.Models.DTOs.Payment;

namespace EcommerceProject.Services.Interfaces
{
    public interface IPaymentService
    {
        string InitiateEsewaPayment(int orderId, decimal amount);

        Task HandleEsewaSuccessAsync(string base64Data);

        Task HandleEsewaFailureAsync(string transactionUuid);
    }
}