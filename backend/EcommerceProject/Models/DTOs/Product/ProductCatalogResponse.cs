using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using System.Text.Json.Serialization;

namespace EcommerceProject.Models.DTOs.Product
{
    public class ProductCatalogResponse : PagedResult<ProductListItemDto>
    {
        [JsonPropertyOrder(99)]
        public decimal HighestPrice { get; set; }

        public ProductCatalogResponse(
            IReadOnlyList<ProductListItemDto> items, 
            int page, 
            int pageSize, 
            int totalCount, 
            decimal highestPrice) 
            : base(items, page, pageSize, totalCount)
        {
            HighestPrice = highestPrice;
        }
    }
}