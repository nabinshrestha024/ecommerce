using EcommerceProject.Models.DTOs.Common;

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
}