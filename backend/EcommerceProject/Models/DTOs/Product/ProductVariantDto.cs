using System.Text.Json.Serialization;

namespace EcommerceProject.Models.DTOs.Product
{
    public class ProductVariantDto
    {
        [JsonIgnore]
        public int ProductId { get; set; } 
        public int VariantId { get; set; }
        public string SKU { get; set; } = default!;
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public bool IsDefault { get; set; }
        public bool IsActive { get; set; }

        public Dictionary<string, string> Attributes { get; set; } = new();
        
        // public List<VariantAttributeValueDto> Attributes { get; set; } = new();
    }
}
