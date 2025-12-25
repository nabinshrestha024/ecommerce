using EcommerceProject.Models.DTOs.EsewaPayment;

namespace EcommerceProject.Services.Interfaces
{
    public interface IEsewaService
    {
        Task<EsewaInitiateResponseDto> InitiateAsync(int orderId);
        Task<bool> FinalizeEsewaPaymentAsync(EsewaVerifyResponseDto payload);
        Task<EsewaStatusResponseDto> CheckStatusAsync(string txn, decimal amount);
    }
}