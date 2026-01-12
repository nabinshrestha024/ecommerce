using System.Collections.Generic;
using System.Threading.Tasks;
using EcommerceProject.Models.DTOs.Vendor;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IVendorRepository
    {
        Task<VendorDto> GetVendorByIdAsync(int vendorId);
        Task<List<VendorDto>> GetAllVendorsAsync(bool? isActive = null, int pageNumber = 1, int pageSize = 10);
        Task<VendorDto> CreateVendorAsync(CreateVendorRequestDto request, int createdBy);
        Task<VendorDto> UpdateVendorAsync(int vendorId, UpdateVendorRequestDto request);
        Task<bool> DeleteVendorAsync(int vendorId);
    }
}