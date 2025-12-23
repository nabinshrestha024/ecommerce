namespace EcommerceProject.Repositories.Interfaces
{
    public interface IPaymentRepository
    {
        int InitiatePayment(int orderId, decimal amount, string url);
        void MarkSuccess(int orderId, string txnId, string refId);
        void MarkFailed(int orderId);
    }
}