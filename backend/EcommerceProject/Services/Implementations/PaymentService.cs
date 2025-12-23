
using EcommerceProject.Models.DTOs.Payment;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using EcommerceProject.utils;
using System.Text;
using Newtonsoft.Json;

namespace EcommerceProject.Services.Implementations
{
    public class PaymentService : IPaymentService
{
    private readonly IPaymentRepository _paymentRepo;
    private readonly IOrderRepository _orderRepo;
    private readonly IConfiguration _config;
    private readonly HttpClient _http;

    public PaymentService(
        IPaymentRepository paymentRepo,
        IOrderRepository orderRepo,
        IConfiguration config,
        HttpClient http)
    {
        _paymentRepo = paymentRepo;
        _orderRepo = orderRepo;
        _config = config;
        _http = http;
    }

    public string InitiateEsewaPayment(int orderId, decimal amount)
    {
        var txnUuid = Guid.NewGuid().ToString();

        _paymentRepo.CreatePayment(orderId, amount, txnUuid);

        var signature = EsewaSignatureHelper.Generate(
            amount.ToString("0.00"),
            txnUuid,
            _config["ESewa:ProductCode"] ?? throw new InvalidOperationException("ESewa:ProductCode is not configured"),
            _config["ESewa:SecretKey"] ?? throw new InvalidOperationException("ESewa:SecretKey is not configured"));

        return BuildEsewaRedirectUrl(amount, txnUuid, signature);
    }

    public async Task HandleEsewaSuccessAsync(string base64Data)
    {
        var json = Encoding.UTF8.GetString(Convert.FromBase64String(base64Data));
        var response = JsonConvert.DeserializeObject<EsewaSuccessResponseDto>(json);
        
        if (response == null)
            throw new InvalidOperationException("Failed to deserialize eSewa success response");

        var expectedSignature = EsewaSignatureHelper.Generate(
            (response.TotalAmount ?? 0).ToString("0.00"),
            response.TransactionCode ?? throw new InvalidOperationException("TransactionCode is missing"),
            response.ProductCode ?? _config["ESewa:ProductCode"] ?? throw new InvalidOperationException("ProductCode is missing"),
            _config["ESewa:SecretKey"] ?? throw new InvalidOperationException("ESewa:SecretKey is not configured"));

        if (expectedSignature != response.Signature)
            throw new Exception("Invalid eSewa signature");

        var payment = _paymentRepo.GetByTransactionId(response.TransactionCode);
        if (payment == null || payment.Status == "Success") return; // idempotent

        var status = await CheckStatusAsync(response.TransactionCode, response.TotalAmount ?? 0);
        if (status.Status != "COMPLETE")
            throw new Exception("Payment not completed");

        if (string.IsNullOrEmpty(status.RefId))
            throw new Exception("Invalid reference ID from payment gateway");

        _paymentRepo.MarkPaymentSuccess(payment.PaymentId, status.RefId, JsonConvert.SerializeObject(status));
        _orderRepo.UpdateOrderPaymentStatus(payment.OrderId, "Paid", "Confirmed");

        _paymentRepo.InsertGatewayTransaction(
            payment.PaymentId,
            response.TransactionCode,
            status.RefId,
            payment.Amount,
            "SUCCESS",
            JsonConvert.SerializeObject(status));

        _paymentRepo.InsertLedgerTransaction(
            payment.OrderId,
            payment.PaymentId,
            payment.Amount,
            status.RefId);
    }

    public async Task HandleEsewaFailureAsync(string transactionUuid)
    {
        var payment = _paymentRepo.GetByTransactionId(transactionUuid);
        if (payment == null || payment.Status != "Pending") return;

        _paymentRepo.MarkPaymentFailed(payment.PaymentId, "Payment failed or cancelled");
        _orderRepo.UpdateOrderPaymentStatus(payment.OrderId, "Failed", "Cancelled");
    }

    private async Task<EsewaStatusResponseDto> CheckStatusAsync(string txnUuid, decimal amount)
    {
        var url =
            $"{_config["ESewa:StatusCheckUrl"]}" +
            $"?product_code={_config["ESewa:ProductCode"]}" +
            $"&transaction_uuid={txnUuid}" +
            $"&total_amount={amount}";

        var res = await _http.GetAsync(url);
        var json = await res.Content.ReadAsStringAsync();
        var status = JsonConvert.DeserializeObject<EsewaStatusResponseDto>(json);
        return status ?? throw new InvalidOperationException("Failed to deserialize eSewa status response");
    }

    private string BuildEsewaRedirectUrl(decimal amount, string txnUuid, string signature)
    {
        return $"{_config["ESewa:BaseUrl"]}" +
               $"?amount={amount}" +
               $"&tax_amount=0" +
               $"&total_amount={amount}" +
               $"&transaction_uuid={txnUuid}" +
               $"&product_code={_config["ESewa:ProductCode"]}" +
               $"&success_url={_config["ESewa:SuccessUrl"]}" +
               $"&failure_url={_config["ESewa:FailureUrl"]}" +
               $"&signed_field_names=total_amount,transaction_uuid,product_code" +
               $"&signature={signature}";
    }
}
}