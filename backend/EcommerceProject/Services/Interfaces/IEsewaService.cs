using EcommerceProject.Models.DTOs.EsewaPayment;

namespace EcommerceProject.Services.Interfaces
{
    public interface IEsewaService
    {
        Task<EsewaInitiateResponseDto> InitiateEsewaPaymentAsync(int orderId);
        Task<bool> VerifyByStatusAsync(EsewaVerifyResponseDto payload);
        Task<EsewaStatusResponseDto?> CheckStatusAsync(string transactionUuid, decimal totalAmount);
    }
}