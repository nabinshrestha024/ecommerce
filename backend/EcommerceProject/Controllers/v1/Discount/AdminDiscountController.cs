using EcommerceProject.Models.DTOs.Discount;
using EcommerceProject.Services.Implementations;
using EcommerceProject.Services.Interfaces;
using FluentValidation;
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


        [HttpPost("adds")]
        public async Task<IActionResult> AddDiscount([FromBody] CreateDiscountDto request)
        {
            try
            {
                var discountId = await _service.AddDiscountAsync(request);
                return Ok(new { DiscountId = discountId, Message = "Discount added successfully" });
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { Message = "Validation failed", Errors = ex.Errors });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update(UpdateDiscountDto dto)
        {
            await _service.UpdateAsync(dto);
            return Ok(new { message = "Discount updated successfully" });
        }

        [HttpPatch("status")]
        public async Task<IActionResult> Toggle(int discountId, [FromQuery] bool isActive)
        {
            await _service.ToggleAsync(discountId, isActive);
            return Ok("Discount Status Updated");
        }


    }
}
