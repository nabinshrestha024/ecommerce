using System.Collections.Generic;
using System.Threading.Tasks;
using EcommerceProject.Models.DTOs.Vendor;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IVendorRepository
    {
        Task<VendorDto> GetVendorByIdAsync(int vendorId);
        //Task<List<VendorDto>> GetAllVendorsAsync(bool? isActive = null, int pageNumber = 1, int pageSize = 10);

        Task<List<VendorDto>> GetAllVendorsAsync(
        bool? isActive = null,
        int page = 1,
        int pageSize = 10,
        string sortOrder = "Descending");
        
        Task<VendorDto> CreateVendorAsync(CreateVendorRequestDto request, int createdBy);
        Task<VendorDto> UpdateVendorAsync(int vendorId, UpdateVendorRequestDto request);
        Task<bool> DeleteVendorAsync(int vendorId);
    }
}