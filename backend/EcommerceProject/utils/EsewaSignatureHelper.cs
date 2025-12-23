using System.Security.Cryptography;
using System.Text;

namespace EcommerceProject.utils
{
    public static class EsewaSignatureHelper
    {
        public static string Generate(
            string TotalAmount,
            string TransactionUuid,
            string ProductCode,
            string secretKey)
        {
                var payload =
                    $"total_amount={TotalAmount}," +
                    $"transaction_uuid={TransactionUuid}," +
                    $"product_code={ProductCode}";

                using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secretKey));
                var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(payload));
                return Convert.ToBase64String(hash);
        }
    }
}