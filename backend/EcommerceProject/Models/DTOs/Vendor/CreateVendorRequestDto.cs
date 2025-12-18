
namespace EcommerceProject.Models.DTOs.Vendor
{
    public class CreateVendorRequestDto
    {
        public string? Name { get; set; }
        public string? ContactPerson { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
    }
}