using System.Collections.Generic;
using System.Threading.Tasks;
using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Vendor;

namespace EcommerceProject.Services.Interfaces
{
    public interface IVendorService
    {
        Task<VendorDto> GetVendorByIdAsync(int vendorId);

        Task<PagedResult<VendorDto>> GetAllVendorsAsync(bool? isActive, PaginationDto pagination);
        Task<VendorDto> CreateVendorAsync(CreateVendorRequestDto request, int createdBy);
        Task<VendorDto> UpdateVendorAsync(int vendorId, UpdateVendorRequestDto request, int updatedBy);
        Task<bool> DeleteVendorAsync(int vendorId, int deletedBy);
    }
}