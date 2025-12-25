using EcommerceProject.Models.DTOs.Discount;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.Discount
{
    [Route("v1/admin/discounts")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminDiscountController : ControllerBase
    {
        private readonly IAdminDiscountService _service;

        public AdminDiscountController(IAdminDiscountService service)
        {
            _service = service;
            
        }
        [HttpGet("get")]
        public async Task<IActionResult> GetAll()
        {

            return Ok(await _service.GetAllAsync());
        }

        [HttpPost("add")]
        public async Task<IActionResult> Create([FromBody]CreateDiscountDto dto)
        {
            await _service.CreateAsync(dto);
            return Ok("Discount created");

        }
        [HttpPut("update")]
        public async Task<IActionResult> update(int discountId, CreateDiscountDto dto)
        {
            await _service.UpdateAsync(discountId, dto);
            return Ok("discount updated");

        }

        [HttpPatch("status")]
        public async Task<IActionResult> Toggle(int discountId, [FromQuery] bool isActive)
        {
            await _service.ToggleAsync(discountId, isActive);
            return Ok("Discount Status Updated");
        }


    }
}
