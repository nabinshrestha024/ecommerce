using Dapper;
using EcommerceProject.Models.DTOs.Payment;
using EcommerceProject.Repositories.Interfaces;
using System.Data;

namespace EcommerceProject.Repositories.Implementations
{
    public class CheckoutRepository : ICheckoutRepository
    {
        private readonly IDbConnection _db;

        public CheckoutRepository(IDbConnection db)
        {
            _db = db;
        }
        
        public int CreateOrder(int userId, CheckoutRequestDto dto)
        {
            var p = new DynamicParameters();
            p.Add("@UserId", userId);
            p.Add("@ShippingName", dto.ShippingName);
            p.Add("@ShippingAddress", dto.ShippingAddress);
            p.Add("@ShippingCity", dto.ShippingCity);
            p.Add("@ShippingPhone", dto.ShippingPhone);
            p.Add("@PaymentMethodCode", dto.PaymentMethod);
            p.Add("@OrderId", dbType: DbType.Int32, direction: ParameterDirection.Output);
            _db.Execute("spCheckout_CreateOrder", p, commandType: CommandType.StoredProcedure);
            return p.Get<int>("@OrderId");
        }
    }
}