using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace EcommerceProject.utils
{
    public class EsewaSignatureHelper
    {
        private readonly IConfiguration _config;

        public EsewaSignatureHelper(IConfiguration config)
        {
            _config = config;
        }

        public string GenerateTransactionUuid()
        {
            var now = DateTime.Now;
            return now.ToString("yyMMdd") + "-" + now.ToString("HHmmss");
        }

        public string GenerateSignature(string totalAmount, string txnUuid, string productCode)
        {
            var secretKey = _config["ESewa:SecretKey"] ?? "8gBm/:&EnhH.1/q";
            
            var data = $"total_amount={totalAmount},transaction_uuid={txnUuid},product_code={productCode}";

            using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secretKey));
            return Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(data)));
        }

        public Dictionary<string, string> GeneratePaymentParameters(decimal amount)
        {
            var productCode = _config["ESewa:ProductCode"] ?? "EPAYTEST";
            var successUrl = _config["ESewa:SuccessUrl"] ?? "https://developer.esewa.com.np/success";
            var failureUrl = _config["ESewa:FailureUrl"] ?? "https://developer.esewa.com.np/failure";
            
            var txnUuid = GenerateTransactionUuid();
            
            var taxRate = 0.10m;
            var totalAmount = amount;
            var productAmount = Math.Round(totalAmount / (1 + taxRate), 2);
            var taxAmount = totalAmount - productAmount;
            
            var totalAmountString = totalAmount.ToString("0.00");
            var signature = GenerateSignature(totalAmountString, txnUuid, productCode);

            return new Dictionary<string, string>
            {
                ["amount"] = productAmount.ToString("0.00"),
                ["tax_amount"] = taxAmount.ToString("0.00"),
                ["total_amount"] = totalAmountString,
                ["transaction_uuid"] = txnUuid,
                ["product_code"] = productCode,
                ["product_service_charge"] = "0",
                ["product_delivery_charge"] = "0",
                ["success_url"] = successUrl,
                ["failure_url"] = failureUrl,
                ["signed_field_names"] = "total_amount,transaction_uuid,product_code",
                ["signature"] = signature
            };
        }


        public string GeneratePaymentFormHtml(decimal amount)
        {
            var parameters = GeneratePaymentParameters(amount);
            var formUrl = _config["ESewa:FormUrl"] ?? "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
            
            var htmlBuilder = new StringBuilder();
            htmlBuilder.AppendLine($"<form action=\"{formUrl}\" method=\"POST\">");
            
            foreach (var param in parameters)
            {
                htmlBuilder.AppendLine($"<input type=\"hidden\" name=\"{param.Key}\" value=\"{HttpUtility.HtmlEncode(param.Value)}\">");
            }
            
            htmlBuilder.AppendLine("<input type=\"submit\" value=\"Pay with eSewa\">");
            htmlBuilder.AppendLine("</form>");
            
            return htmlBuilder.ToString();
        }

        public string GeneratePaymentRedirectUrl(decimal amount)
        {
            var baseUrl = _config["ESewa:FormUrl"] ?? "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
            var parameters = GeneratePaymentParameters(amount);
            
            var queryString = string.Join("&", 
                parameters.Select(kv => $"{HttpUtility.UrlEncode(kv.Key)}={HttpUtility.UrlEncode(kv.Value)}"));
            
            return $"{baseUrl}?{queryString}";
        }
    }
}