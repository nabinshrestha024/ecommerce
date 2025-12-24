using EcommerceProject.Models.DTOs.Report;
using EcommerceProject.Services.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Report
{
    [ApiController]
    [Route("v1/admin/reports")]
    [Authorize(Roles ="Admin")]
    public class ReportsController : ControllerBase
    {
        private readonly IReportsService _service;
        private readonly IValidator<ReportFilter> _validator;

        public ReportsController(IReportsService service, IValidator<ReportFilter> validator)
        {
            _service = service;
            _validator = validator;
        }

        [HttpGet("sales-overview")]
        public async Task<IActionResult> GetTotalSales([FromQuery] ReportFilter filter)
        {
            var validation = await _validator.ValidateAsync(filter);
            if (!validation.IsValid) return BadRequest(validation.Errors);

            var result = await _service.GetTotalSalesAsync(filter);
            return Ok(result);
        }

        [HttpGet("orders-by-status")]
        public async Task<IActionResult> GetOrdersByStatus([FromQuery] ReportFilter filter)
        {
            var validation = await _validator.ValidateAsync(filter);
            if (!validation.IsValid) return BadRequest(validation.Errors);

            var result = await _service.GetOrdersByStatusAsync(filter);
            return Ok(result);
        }

        [HttpGet("category-sales")]
        public async Task<IActionResult> GetSalesByCategory([FromQuery] ReportFilter filter)
        {
            var validation = await _validator.ValidateAsync(filter);
            if (!validation.IsValid) return BadRequest(validation.Errors);

            var result = await _service.GetSalesByCategoryAsync(filter);
            return Ok(result);
        }

        [HttpGet("top-products")]
        public async Task<IActionResult> GetTopProducts([FromQuery] ReportFilter filter)
        {
            var validation = await _validator.ValidateAsync(filter);
            if (!validation.IsValid) return BadRequest(validation.Errors);

            var result = await _service.GetTopProductsAsync(filter);
            return Ok(result);
        }

        [HttpGet("low-stock")]
        public async Task<IActionResult> GetLowStock([FromQuery] ReportFilter filter)
        {
            var validation = await _validator.ValidateAsync(filter);
            if (!validation.IsValid) return BadRequest(validation.Errors);

            var result = await _service.GetLowStockProductsAsync(filter);
            return Ok(result);
        }
    }

}
