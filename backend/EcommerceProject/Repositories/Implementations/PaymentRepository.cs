using Dapper;
using EcommerceProject.Repositories.Interfaces;
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

        public int InitiatePayment(int orderId, decimal amount, string url)
        {
            var p = new DynamicParameters();
            p.Add("@OrderId", orderId);
            p.Add("@Amount", amount);
            p.Add("@PaymentMethod", "esewa");
            p.Add("@PaymentURL", url);
            p.Add("@PaymentId", dbType: DbType.Int32, direction: ParameterDirection.Output);

            _db.Execute("spPayment_Initiate", p, commandType: CommandType.StoredProcedure);
            return p.Get<int>("@PaymentId");
        }

        public void MarkSuccess(int orderId, string txnId, string refId)
        {
            _db.Execute("spPayment_MarkSuccess",
            new { OrderId = orderId, TransactionId = txnId, GatewayTxnId = refId },
            commandType: CommandType.StoredProcedure);
        }

        public void MarkFailed(int orderId)
        {
            _db.Execute("spPayment_MarkFailed",
            new { OrderId = orderId },
            commandType: CommandType.StoredProcedure);
        }
    }
}