using System.Data;
using Dapper;
using EcommerceProject.Models.Entities;
using EcommerceProject.Repositories.Interfaces;

namespace EcommerceProject.Repositories.Implementations
{
    public class EsewaRepository : IEsewaRepository
    {
        private readonly IDbConnection _db;

        public EsewaRepository(IDbConnection db)
        {
            
            _db = db;
        }

        public async Task<decimal?> GetOrderAmountAsync(int orderId)
        {
            var result = await _db.ExecuteScalarAsync<decimal?>(
                "spEsewa_GetOrderAmount",
                new { OrderId = orderId },
                commandType: CommandType.StoredProcedure
            );

            return result;
        }

        public async Task<int> CreatePaymentAsync(int orderId, decimal amount, string txn)
        {
            return await
            _db.ExecuteScalarAsync<int>(
                "spEsewa_CreatePayment",
                new
                {
                    OrderId = orderId,
                    Amount = amount,
                    TransactionUUID = txn,
                },
                commandType: CommandType.StoredProcedure
            );
        }

        public Task<EsewaPayment?> GetByTxnAsync(string txn) =>
        _db.QuerySingleOrDefaultAsync<EsewaPayment>(
            "spEsewa_GetPaymentForVerification",
            new { TransactionUUID = txn },
            commandType: CommandType.StoredProcedure);



        public async Task<Payment?> GetPaymentByTransactionUUIDAsync(string txn)
        {
            return await _db.QuerySingleOrDefaultAsync<Payment>(
                "SELECT * FROM Payments WHERE TransactionId = @Txn",
                new { Txn = txn }
            );
        }

        public async Task MarkSuccessAsync(
            int paymentId,
            string refId,
            string res
        )
        {
            await _db.ExecuteAsync(
                "spEsewa_MarkSuccess",
                new
                {
                    PaymentId = paymentId,
                    GatewayReference = refId,
                    RawResponse = res,
                },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task MarkFailedAsync(int paymentId, string res)
        {
            await _db.ExecuteAsync(
                "spEsewa_MarkFailed",
                new { PaymentId = paymentId, RawResponse = res },
                commandType: CommandType.StoredProcedure
            );
        }
    }
}
