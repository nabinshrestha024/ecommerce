using EcommerceProject.Models.DTOs.EsewaPayment;

namespace EcommerceProject.Services.Interfaces
{
    // public interface IEsewaService
    // {
    //     Task<EsewaInitiateResponseDto> InitiateAsync(int orderId);

    //     // public Task<bool> VerifyPaymentAsync(string txn, string status, decimal amount);

    //     Task<bool> FinalizeEsewaPaymentAsync(EsewaSuccessPayload payload);

    //     Task<EsewaStatusResponseDto> CheckStatusAsync(string txn, decimal amount);

    // }

    public interface IEsewaService
{
    Task<EsewaInitiateResponseDto> InitiateAsync(int orderId);
    Task<bool> FinalizeEsewaPaymentAsync(EsewaVerifyResponseDto payload);
    Task<EsewaStatusResponseDto> CheckStatusAsync(string txn, decimal amount);
}

}