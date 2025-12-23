using Dapper;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Models.Entities;
using System.Data;


namespace EcommerceProject.Repositories.Implementations
{
    public class PaymentRepository : IPaymentRepository
{
    private readonly IDbConnection _db;

    public PaymentRepository(IDbConnection db)
    {
        _db = db;
    }

    public int CreatePayment(int orderId, decimal amount, string transactionId)
    {
        return _db.ExecuteScalar<int>(
            "spPayment_Create",
            new { OrderId = orderId, Amount = amount, TransactionId = transactionId },
            commandType: CommandType.StoredProcedure);
    }

    public Payment? GetByTransactionId(string transactionId)
    {
        return _db.QuerySingleOrDefault<Payment>(
            "spPayment_GetByTransactionId",
            new { TransactionId = transactionId },
            commandType: CommandType.StoredProcedure);
    }

    public void MarkPaymentSuccess(int paymentId, string gatewayReference, string metadata)
    {
        _db.Execute(
            "spPayment_MarkSuccess",
            new { PaymentId = paymentId, GatewayReference = gatewayReference, Metadata = metadata },
            commandType: CommandType.StoredProcedure);
    }

    public void MarkPaymentFailed(int paymentId, string reason)
    {
        _db.Execute(
            "spPayment_MarkFailed",
            new { PaymentId = paymentId, Reason = reason },
            commandType: CommandType.StoredProcedure);
    }

    public void InsertGatewayTransaction(
        int paymentId,
        string transactionId,
        string referenceId,
        decimal amount,
        string status,
        string rawResponse)
    {
        _db.Execute(
            "spPaymentGatewayTransactions_Create",
            new
            {
                PaymentId = paymentId,
                TransactionId = transactionId,
                ReferenceId = referenceId,
                Amount = amount,
                Status = status,
                RawResponse = rawResponse
            },
            commandType: CommandType.StoredProcedure);
    }

    public void InsertLedgerTransaction(
        int orderId,
        int paymentId,
        decimal amount,
        string referenceId)
    {
        _db.Execute(
            "spTransactions_Create",
            new
            {
                OrderId = orderId,
                PaymentId = paymentId,
                Amount = amount,
                ReferenceId = referenceId
            },
            commandType: CommandType.StoredProcedure);
    }
}

}