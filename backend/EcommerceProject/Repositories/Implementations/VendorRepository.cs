using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.Vendor;
using EcommerceProject.Repositories;
using EcommerceProject.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace EcommerceProject.Repositories.Implementations
{
    public class VendorRepository : IVendorRepository
    {
        private readonly SqlConnectionFactory _connectionFactory;
        private readonly ILogger<VendorRepository> _logger;

        public VendorRepository(IConfiguration configuration, ILogger<VendorRepository> logger)
        {
            _connectionFactory = new SqlConnectionFactory(configuration);
            _logger = logger;
        }

        public async Task<VendorDto?> GetVendorByIdAsync(int vendorId)
        {
            try
            {
                using var connection = _connectionFactory.CreateConnection();
                return await connection.QuerySingleOrDefaultAsync<VendorDto>(
                    "spVendors_GetById",
                    new { VendorId = vendorId },
                    commandType: CommandType.StoredProcedure
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting vendor by ID {VendorId}", vendorId);
                throw;
            }
        }

        public async Task<List<VendorDto>> GetAllVendorsAsync(bool? isActive = null, int page = 1, int pageSize = 10)
        {
            try
            {
                using var connection = _connectionFactory.CreateConnection();
                var vendors = await connection.QueryAsync<VendorDto>(
                    "spVendors_GetAll",
                    new 
                    { 
                        IsActive = isActive,
                        Page = page,
                        PageSize = pageSize
                    },
                    commandType: CommandType.StoredProcedure
                );
                return vendors.AsList();
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
                using var connection = _connectionFactory.CreateConnection();
                return await connection.QuerySingleAsync<VendorDto>(
                    "spVendors_Create",
                    new
                    {
                        request.Name,
                        request.ContactPerson,
                        request.Phone,
                        request.Email,
                        request.Address
                    },
                    commandType: CommandType.StoredProcedure
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating vendor");
                throw;
            }
        }

        public async Task<VendorDto?> UpdateVendorAsync(int vendorId, UpdateVendorRequestDto request)
        {
            try
            {
                using var connection = _connectionFactory.CreateConnection();
                return await connection.QuerySingleOrDefaultAsync<VendorDto>(
                    "spVendors_Update",
                    new
                    {
                        VendorId = vendorId,
                        request.Name,
                        request.ContactPerson,
                        request.Phone,
                        request.Email,
                        request.Address,
                        request.IsActive
                    },
                    commandType: CommandType.StoredProcedure
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating vendor {VendorId}", vendorId);
                throw;
            }
        }

        public async Task<bool> DeleteVendorAsync(int vendorId)
        {
            try
            {
                using var connection = _connectionFactory.CreateConnection();
                var rowsAffected = await connection.ExecuteScalarAsync<int>(
                    "spVendors_Delete",
                    new { VendorId = vendorId },
                    commandType: CommandType.StoredProcedure
                );
                return rowsAffected > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting vendor {VendorId}", vendorId);
                throw;
            }
        }
    }
}