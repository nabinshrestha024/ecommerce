
namespace EcommerceProject.Models.DTOs.Vendor
{
    public class VendorDto
    {
        public int VendorId { get; set; }
        public string? Name { get; set; }
        public string? ContactPerson { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public int TotalCount { get; set; }
    }

    public class PagedResponse<T>
    {
        public bool Success { get; set; }
        public T? Data { get; set; }
        public int TotalRecords { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}