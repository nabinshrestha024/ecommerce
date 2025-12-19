using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EcommerceProject.Models.DTOs.Stock;
using EcommerceProject.Services.Interfaces;
using Microsoft.Extensions.Logging;

namespace EcommerceProject.Controllers.v1.Admin
{
    [ApiController]
    [Route("v1/admin/stock")]
    public class StockController : ControllerBase
    {
        private readonly IStockService _stockService;
        private readonly ILogger<StockController> _logger;

        public StockController(IStockService stockService, ILogger<StockController> logger)
        {
            _stockService = stockService;
            _logger = logger;
        }

        // GET v1/admin/stock
        [HttpGet]
        public async Task<IActionResult> GetAllStock()
        {
            try
            {
                var stock = await _stockService.GetAllStockAsync();
                return Ok(new { Success = true, Data = stock });
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error getting all stock");
                return StatusCode(500, new { Success = false, Message = "Internal server error" });
            }
        }

        // POST v1/admin/stock/adjust
        [HttpPost("adjust")]
        public async Task<IActionResult> AdjustStock([FromBody] StockAdjustmentRequestDto request)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(new { Success = false, Message = "Invalid request", Errors = ModelState });

                var adjustedBy = GetCurrentUserId();
                var adjustment = await _stockService.AdjustStockAsync(request, adjustedBy);
                
                return Ok(new { 
                    Success = true, 
                    Message = "Stock adjusted successfully", 
                    Data = adjustment 
                });
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error adjusting stock for product {ProductId}", request.ProductId);
                return StatusCode(500, new { Success = false, Message = "Internal server error" });
            }
        }

        // Additional useful endpoint: low-stock alerts
        [HttpGet("low-stock")]
        public async Task<IActionResult> GetLowStockAlerts()
        {
            try
            {
                var lowStockProducts = await _stockService.GetLowStockProductsAsync();
                return Ok(new { Success = true, Data = lowStockProducts });
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error getting low stock alerts");
                return StatusCode(500, new { Success = false, Message = "Internal server error" });
            }
        }

        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst("UserId")?.Value;
            if (int.TryParse(userIdClaim, out int userId))
                return userId;
            
            return 0;
        }
    }
}