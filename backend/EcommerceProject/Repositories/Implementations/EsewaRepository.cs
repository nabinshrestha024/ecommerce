using EcommerceProject.Repositories.Interfaces;
using Dapper;
using System.Data;
using EcommerceProject.Models.Entities;

namespace EcommerceProject.Repositories.Implementations
{
    public class EsewaRepository : IEsewaRepository
    {
        private readonly IDbConnection _db;

        public EsewaRepository(IDbConnection db)
        {
            _db = db;
        }

        public async Task<int> CreatePaymentAsync(int orderId, decimal amount, string txn)
        {
            return await _db.ExecuteScalarAsync<int>(
                "spEsewa_CreatePayment",
                new { OrderId = orderId, Amount = amount, TransactionUUID = txn },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<EsewaPayment?> GetByTxnAsync(string txn)
        {
            Console.WriteLine($"Fetching payment for txn: {txn}");
            return await _db.QuerySingleOrDefaultAsync<EsewaPayment>(
             "SELECT * FROM Payments WHERE TransactionId = @TransactionUUID",
            new { TransactionUUID = txn });
        }

        public async Task<Payment?> GetPaymentByTransactionUUIDAsync(string txn)
        {
            return await _db.QuerySingleOrDefaultAsync<Payment>(
                "SELECT * FROM Payments WHERE TransactionId = @Txn",
                new { Txn = txn });
        }

        public async Task MarkSuccessAsync(int paymentId, string gatewayReference, string rawResponse)
        {
            await _db.ExecuteAsync(
                "spEsewa_MarkSuccess",
                new
                {
                    PaymentId = paymentId,
                    GatewayReference = gatewayReference,
                    RawResponse = rawResponse
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task MarkFailedAsync(int paymentId, string rawResponse)
        {
            await _db.ExecuteAsync(
                "spEsewa_MarkFailed",
                new
                {
                    PaymentId = paymentId,
                    RawResponse = rawResponse
                },
                commandType: CommandType.StoredProcedure);
        }
    }
}
