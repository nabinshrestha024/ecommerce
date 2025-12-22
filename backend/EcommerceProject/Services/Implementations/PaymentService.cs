using EcommerceProject.Models.DTOs.Payment;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;

namespace EcommerceProject.Services.Implementations
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _repo;
        private const string EsewaBaseUrl = "https://uat.esewa.com.np/epay/main";
        private const string MerchantCode = "EPAYTEST";

        public PaymentService(IPaymentRepository repo)
        {
            _repo = repo;
        }

        public EsewaInitiateResponseDto InitiateEsewa(int orderId)
        {
            string url =
            $"{EsewaBaseUrl}?amt=100&pdc=0&psc=0&txAmt=0&tAmt=100" +
            $"&pid={orderId}" +
            $"&scd={MerchantCode}" +
            $"&su=http://localhost:5093/api/payments/esewa/success" +
            $"&fu=http://localhost:5093/api/payments/esewa/failure";

            _repo.InitiatePayment(orderId, 100, url);

            return new EsewaInitiateResponseDto { RedirectUrl = url };
        }

        public void EsewaSuccess(int orderId, string txnId, string refId)
            => _repo.MarkSuccess(orderId, txnId, refId);

        public void EsewaFailure(int orderId)
            => _repo.MarkFailed(orderId);
    }
}