using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EcommerceProject.Models.DTOs.PurchaseOrder;
using EcommerceProject.Services.Interfaces;
using Microsoft.Extensions.Logging;

namespace EcommerceProject.Controllers.v1.Admin
{
    [ApiController]
    [Route("v1/admin/purchase-orders")]
    public class PurchaseOrdersController : ControllerBase
    {
        private readonly IPurchaseOrderService _purchaseOrderService;
        private readonly ILogger<PurchaseOrdersController> _logger;

        public PurchaseOrdersController(IPurchaseOrderService purchaseOrderService, ILogger<PurchaseOrdersController> logger)
        {
            _purchaseOrderService = purchaseOrderService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePurchaseOrder([FromBody] CreatePurchaseOrderRequestDto request)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(new { Success = false, Message = "Invalid request", Errors = ModelState });

                var createdBy = GetCurrentUserId();
                var purchaseOrder = await _purchaseOrderService.CreatePurchaseOrderAsync(request, createdBy);
                
                return Ok(new { 
                    Success = true, 
                    Message = "Purchase order created successfully", 
                    Data = purchaseOrder 
                });
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error creating purchase order");
                return StatusCode(500, new { Success = false, Message = "Internal server error" });
            }
        }

        [HttpPut("{id}/receive")]
        public async Task<IActionResult> ReceivePurchaseOrder(int id, [FromBody] ReceivePurchaseOrderRequestDto request)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(new { Success = false, Message = "Invalid request", Errors = ModelState });

                var receivedBy = GetCurrentUserId();
                var purchaseOrder = await _purchaseOrderService.ReceivePurchaseOrderAsync(id, request, receivedBy);
                
                if (purchaseOrder == null)
                    return NotFound(new { Success = false, Message = "Purchase order not found or not approved" });

                return Ok(new { 
                    Success = true, 
                    Message = "Purchase order received successfully", 
                    Data = purchaseOrder 
                });
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error receiving purchase order {POId}", id);
                return StatusCode(500, new { Success = false, Message = "Internal server error" });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPurchaseOrders(
            [FromQuery] int page = 1,
            [FromQuery] int size = 10,
            [FromQuery] string? status = null)
        {
            try
            {
                var result = await _purchaseOrderService.GetAllPurchaseOrdersAsync(page, size, status);
                return Ok(new { Success = true, Data = result });
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error getting all purchase orders");
                return StatusCode(500, new { Success = false, Message = "Internal server error" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPurchaseOrderById(int id)
        {
            try
            {
                var purchaseOrder = await _purchaseOrderService.GetPurchaseOrderByIdAsync(id);
                if (purchaseOrder == null)
                    return NotFound(new { Success = false, Message = "Purchase order not found" });

                return Ok(new { Success = true, Data = purchaseOrder });
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error getting purchase order by ID {POId}", id);
                return StatusCode(500, new { Success = false, Message = "Internal server error" });
            }
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdatePurchaseOrderStatus(int id, [FromBody] UpdatePurchaseOrderStatusRequestDto request)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(new { Success = false, Message = "Invalid request", Errors = ModelState });

                var updatedBy = GetCurrentUserId();
                var purchaseOrder = await _purchaseOrderService.UpdatePurchaseOrderStatusAsync(id, request.Status, updatedBy);
                
                if (purchaseOrder == null)
                    return NotFound(new { Success = false, Message = "Purchase order not found" });

                return Ok(new { 
                    Success = true, 
                    Message = "Purchase order status updated successfully", 
                    Data = purchaseOrder 
                });
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error updating purchase order status for PO {POId}", id);
                return StatusCode(500, new { Success = false, Message = "Internal server error" });
            }
        }

        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst("UserId")?.Value;
            if (int.TryParse(userIdClaim, out int userId))
                return userId;
            
            return 1; // change to 0 after [Authorize] is enabled
        }
    }
}