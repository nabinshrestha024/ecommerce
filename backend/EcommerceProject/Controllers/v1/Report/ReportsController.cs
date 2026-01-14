using EcommerceProject.Filters;
using EcommerceProject.Services.Implementations;
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
        private readonly IReportsService _reportservice;

        public ReportsController(IReportsService service)
        {
            _reportservice = service;
           
        }

        [HttpGet("user-registration-overview")]
        public async Task<IActionResult> GetUserRegistrationOverview([FromQuery] ReportFilter filter)
        {
            var report = await _reportservice.GetUserRegistrationOverviewReportAsync(filter);
            return Ok(report);
        }


        [HttpGet("sales-overview")]
        public async Task<IActionResult> SalesOverview([FromQuery] ReportFilter filter)
        {
            var result = await _reportservice.GetSalesOverviewAsync(filter);
            return Ok(result);
        }


        [HttpGet("top-products")]
        public async Task<IActionResult> TopProducts([FromQuery] ReportFilter filter)
        {
            var result = await _reportservice.GetTopProductsAsync(filter);
            return Ok(result);
        }

        [HttpGet("category-sales")]
        public async Task<IActionResult> CategorySales([FromQuery] ReportFilter filter)
        {
            var result = await _reportservice.GetCategorySalesAsync(filter);
            return Ok(result);
        }

        [HttpGet("low-stock")]
        public async Task<IActionResult> LowStock([FromQuery] ReportFilter filter)
        {
            var result = await _reportservice.GetLowStockAsync(filter);
            return Ok(result);
        }

        [HttpGet("orders-status-report")]
        public async Task<IActionResult> GetOrdersStatusReport([FromQuery] ReportFilter filter)
        {
            var result = await _reportservice.GetOrdersStatusReportAsync(filter);
            return Ok(result);
        }
    }

}
