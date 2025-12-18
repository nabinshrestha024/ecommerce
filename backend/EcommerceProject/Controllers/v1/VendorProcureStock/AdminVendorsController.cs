//using System.Collections.Generic;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using EcommerceProject.Models.DTOs.Vendor;
//using EcommerceProject.Services.Interfaces;
//using Microsoft.Extensions.Logging;

//namespace EcommerceProject.Controllers.v1.Admin
//{
//    [ApiController]
//    [Route("v1/admin/vendors")]
//    [Authorize(Roles = "Admin")]
//    public class VendorsController : ControllerBase
//    {
//        private readonly IVendorService _vendorService;
//        private readonly ILogger<VendorsController> _logger;

//        public VendorsController(IVendorService vendorService, ILogger<VendorsController> logger)
//        {
//            _vendorService = vendorService;
//            _logger = logger;
//        }

//        // GET v1/admin/vendors
//        [HttpGet]
//        public async Task<IActionResult> GetAllVendors([FromQuery] bool? isActive = null)
//        {
//            try
//            {
//                var vendors = await _vendorService.GetAllVendorsAsync(isActive);
//                return Ok(new { Success = true, Data = vendors });
//            }
//            catch (System.Exception ex)
//            {
//                _logger.LogError(ex, "Error getting all vendors");
//                return StatusCode(500, new { Success = false, Message = "Internal server error" });
//            }
//        }

//        // POST v1/admin/vendors
//        [HttpPost]
//        public async Task<IActionResult> CreateVendor([FromBody] CreateVendorRequestDto request)
//        {
//            try
//            {
//                if (!ModelState.IsValid)
//                    return BadRequest(new { Success = false, Message = "Invalid request", Errors = ModelState });

//                var createdBy = GetCurrentUserId();
//                var vendor = await _vendorService.CreateVendorAsync(request, createdBy);
                
//                return CreatedAtAction(nameof(GetVendorById), new { id = vendor.VendorId }, 
//                    new { Success = true, Message = "Vendor created successfully", Data = vendor });
//            }
//            catch (System.Exception ex)
//            {
//                _logger.LogError(ex, "Error creating vendor");
//                return StatusCode(500, new { Success = false, Message = "Internal server error" });
//            }
//        }

//        // Additional endpoints (not in original spec but useful)
//        [HttpGet("{id}")]
//        public async Task<IActionResult> GetVendorById(int id)
//        {
//            try
//            {
//                var vendor = await _vendorService.GetVendorByIdAsync(id);
//                if (vendor == null)
//                    return NotFound(new { Success = false, Message = "Vendor not found" });

//                return Ok(new { Success = true, Data = vendor });
//            }
//            catch (System.Exception ex)
//            {
//                _logger.LogError(ex, "Error getting vendor by ID {VendorId}", id);
//                return StatusCode(500, new { Success = false, Message = "Internal server error" });
//            }
//        }

//        [HttpPut("{id}")]
//        public async Task<IActionResult> UpdateVendor(int id, [FromBody] UpdateVendorRequestDto request)
//        {
//            try
//            {
//                if (!ModelState.IsValid)
//                    return BadRequest(new { Success = false, Message = "Invalid request", Errors = ModelState });

//                var updatedBy = GetCurrentUserId();
//                var vendor = await _vendorService.UpdateVendorAsync(id, request, updatedBy);
                
//                if (vendor == null)
//                    return NotFound(new { Success = false, Message = "Vendor not found" });

//                return Ok(new { Success = true, Message = "Vendor updated successfully", Data = vendor });
//            }
//            catch (System.Exception ex)
//            {
//                _logger.LogError(ex, "Error updating vendor {VendorId}", id);
//                return StatusCode(500, new { Success = false, Message = "Internal server error" });
//            }
//        }

//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteVendor(int id)
//        {
//            try
//            {
//                var deletedBy = GetCurrentUserId();
//                var result = await _vendorService.DeleteVendorAsync(id, deletedBy);
                
//                if (!result)
//                    return NotFound(new { Success = false, Message = "Vendor not found" });

//                return Ok(new { Success = true, Message = "Vendor deleted successfully" });
//            }
//            catch (System.Exception ex)
//            {
//                _logger.LogError(ex, "Error deleting vendor {VendorId}", id);
//                return StatusCode(500, new { Success = false, Message = "Internal server error" });
//            }
//        }

//        private int GetCurrentUserId()
//        {
//            var userIdClaim = User.FindFirst("UserId")?.Value;
//            if (int.TryParse(userIdClaim, out int userId))
//                return userId;
            
//            return 0;
//        }
//    }
//}