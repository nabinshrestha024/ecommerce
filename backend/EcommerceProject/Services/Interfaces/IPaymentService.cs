using EcommerceProject.Models.DTOs.Payment;

namespace EcommerceProject.Services.Interfaces
{
    public interface IPaymentService
    {
        EsewaInitiateResponseDto InitiateEsewa(int orderId);
        void EsewaSuccess(int orderId, string txnId, string refId);
        void EsewaFailure(int orderId);
    }
}