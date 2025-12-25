using EcommerceProject.Models.DTOs.EsewaPayment;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace EcommerceProject.Services.Implementations
{
    public class EsewaService : IEsewaService
    {
        private readonly IEsewaRepository _repo;
        private readonly HttpClient _http;

        private const string ProductCode = "EPAYTEST";
        private const string Secret = "8gBm/:&EnhH.1/q";

        public EsewaService(IEsewaRepository repo, HttpClient http)
        {
            _repo = repo;
            _http = http;
        }

        public async Task<EsewaInitiateResponseDto> InitiateAsync(int orderId)
        {
            decimal amount = 1200.00m;  // fetch order amount from orders table
            string total = amount.ToString("0.00");
            string txn = DateTime.UtcNow.ToString("yyMMdd-HHmmssfff");

            await _repo.CreatePaymentAsync(orderId, amount, txn);

            var msg = $"total_amount={total},transaction_uuid={txn},product_code={ProductCode}";

            var sig = Convert.ToBase64String(
                new HMACSHA256(Encoding.UTF8.GetBytes(Secret))
                .ComputeHash(Encoding.UTF8.GetBytes(msg))
            );

            return new EsewaInitiateResponseDto
            {
                PaymentUrl = "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
                Fields = new Dictionary<string, string>
                {
                    { "amount", total },
                    { "tax_amount", "0" },
                    { "total_amount", total },
                    { "transaction_uuid", txn },
                    { "product_code", ProductCode },
                    { "signed_field_names", "total_amount,transaction_uuid,product_code" },
                    { "signature", sig }
                }
            };
        }

        public async Task<bool> FinalizeEsewaPaymentAsync(EsewaVerifyResponseDto payload)
        {
            var map = new Dictionary<string, string>
            {
                { "transaction_code", payload.transaction_code },
                { "status", payload.status },
                { "total_amount", payload.total_amount },
                { "transaction_uuid", payload.transaction_uuid },
                { "product_code", payload.product_code },
                { "signed_field_names", payload.signed_field_names }
            };

            var msg = string.Join(",",
            payload.signed_field_names
                .Split(",")
                .Select(f => $"{f}={map[f]}"));

            var localSig = Convert.ToBase64String(
            new HMACSHA256(Encoding.UTF8.GetBytes(Secret))
                .ComputeHash(Encoding.UTF8.GetBytes(msg)));

            if (localSig != payload.signature)
            return false;


            var res = await CheckStatusAsync(
            payload.transaction_uuid,
            decimal.Parse(payload.total_amount));

            if (res.status != "COMPLETE")
                return false;

            var payment = await _repo.GetByTxnAsync(payload.transaction_uuid);

            if (payment == null)
                return false;

            if (payment.PaymentStatus != "Pending" || payment.Amount != Math.Round(res.total_amount, 2))
                return false;

            await _repo.MarkSuccessAsync(
                payment.PaymentId,
                res.ref_id,                       
            JsonSerializer.Serialize(res));

            return true;
        }

        public async Task<EsewaStatusResponseDto?> CheckStatusAsync(string txn, decimal amount)
        {
            var url =
                $"https://rc.esewa.com.np/api/epay/transaction/status" +
                $"?product_code={ProductCode}" +
                $"&total_amount={amount}" +
                $"&transaction_uuid={txn}";

            var res = await _http.GetStringAsync(url);

            Console.WriteLine("Esewa Status Response: " + res);

            return JsonSerializer.Deserialize<EsewaStatusResponseDto>(
                res,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
            );
        }
    }
}
