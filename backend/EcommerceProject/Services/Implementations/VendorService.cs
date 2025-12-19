using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EcommerceProject.Models.DTOs.Vendor;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using Microsoft.Extensions.Logging;

namespace EcommerceProject.Services.Implementations
{
    public class VendorService : IVendorService
    {
        private readonly IVendorRepository _vendorRepository;
        private readonly ILogger<VendorService> _logger;

        public VendorService(IVendorRepository vendorRepository, ILogger<VendorService> logger)
        {
            _vendorRepository = vendorRepository;
            _logger = logger;
        }

        public async Task<VendorDto> GetVendorByIdAsync(int vendorId)
        {
            try
            {
                _logger.LogInformation("Getting vendor by ID: {VendorId}", vendorId);
                return await _vendorRepository.GetVendorByIdAsync(vendorId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting vendor by ID {VendorId}", vendorId);
                throw;
            }
        }

        public async Task<List<VendorDto>> GetAllVendorsAsync(bool? isActive = null)
        {
            try
            {
                _logger.LogInformation("Getting all vendors with filter IsActive={IsActive}", isActive);
                return await _vendorRepository.GetAllVendorsAsync(isActive);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all vendors");
                throw;
            }
        }

        public async Task<VendorDto> CreateVendorAsync(CreateVendorRequestDto request, int createdBy)
        {
            try
            {
                _logger.LogInformation("Creating new vendor: {VendorName}", request.Name);
                var vendor = await _vendorRepository.CreateVendorAsync(request, createdBy);
                _logger.LogInformation("Vendor created successfully with ID: {VendorId}", vendor.VendorId);
                return vendor;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating vendor");
                throw;
            }
        }

        public async Task<VendorDto> UpdateVendorAsync(int vendorId, UpdateVendorRequestDto request, int updatedBy)
        {
            try
            {
                _logger.LogInformation("Updating vendor: {VendorId}", vendorId);
                var vendor = await _vendorRepository.UpdateVendorAsync(vendorId, request);
                _logger.LogInformation("Vendor updated successfully: {VendorId}", vendorId);
                return vendor;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating vendor {VendorId}", vendorId);
                throw;
            }
        }

        public async Task<bool> DeleteVendorAsync(int vendorId, int deletedBy)
        {
            try
            {
                _logger.LogInformation("Deleting vendor: {VendorId}", vendorId);
                var result = await _vendorRepository.DeleteVendorAsync(vendorId);
                _logger.LogInformation("Vendor deletion result: {Result} for vendor {VendorId}", result, vendorId);
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting vendor {VendorId}", vendorId);
                throw;
            }
        }
    }
}