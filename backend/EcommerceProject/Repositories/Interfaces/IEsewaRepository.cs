using EcommerceProject.Models.Entities;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IEsewaRepository
    {
        Task<int> CreatePaymentAsync(int orderId, decimal amount, string txn);
        Task<EsewaPayment> GetByTxnAsync(string txn);
        Task<Payment> GetPaymentByTransactionUUIDAsync(string txn);
        Task MarkSuccessAsync(int paymentId, string gatewayReference, string rawResponse);
        Task MarkFailedAsync(int paymentId, string rawResponse);
    }
}