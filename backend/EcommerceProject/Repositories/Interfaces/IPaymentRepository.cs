using EcommerceProject.Models.Entities;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IPaymentRepository
    {
        int CreatePayment(int orderId, decimal amount, string transactionId);
        Payment GetByTransactionId(string transactionId);

        void MarkPaymentSuccess(
            int paymentId,
            string gatewayReference,
            string metadata);

        void MarkPaymentFailed(
            int paymentId,
            string reason);
        void InsertGatewayTransaction(
            int paymentId,
            string transactionId,
            string referenceId,
            decimal amount,
            string status,
            string rawResponse);
        void InsertLedgerTransaction(
            int orderId,
            int paymentId,
            decimal amount,
            string referenceId);
    }
}