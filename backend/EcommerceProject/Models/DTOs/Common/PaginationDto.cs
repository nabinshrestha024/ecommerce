namespace EcommerceProject.Models.DTOs.Common
{
    public class PaginationDto
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;

        public string SortOrder { get; set; } = "desc";
    }
}
