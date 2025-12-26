using System.Text.Json.Serialization;

namespace EcommerceProject.Models.DTOs.EsewaPayment
{

        public class EsewaVerifyRequestDto
    {
        [JsonPropertyName("total_amount")]
        public string amt { get; set; }

        [JsonPropertyName("transaction_code")]
        public string rid { get; set; }

        [JsonPropertyName("transaction_uuid")]
        public string pid { get; set; }

        [JsonPropertyName("product_code")]
        public string scd { get; set; }

        [JsonPropertyName("status")]
        public string Status { get; set; }

        [JsonPropertyName("signature")]
        public string Signature { get; set; }
    }
}