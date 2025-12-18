namespace EcommerceProject.Models.DTOs.Product
{
    public class ProductFilterDto
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? Search { get; set; }
        public int? CategoryID { get; set; }
        public bool? IsActive { get; set; }  
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }

        public string SortBy { get; set; } = "createdAt"; 
        public string SortDir { get; set; } = "desc";
    }
}
