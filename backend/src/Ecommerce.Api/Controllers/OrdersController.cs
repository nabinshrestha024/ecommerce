using Ecommerce.Application.Common.Models;
using Ecommerce.Application.DTOs.Order;
using Ecommerce.Application.Features.Orders.Commands;
using Ecommerce.Application.Features.Orders.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Api.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public OrdersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] OrderCreateDto dto)
        {
            var id = await _mediator.Send(new CreateOrderCommand(dto));
            return CreatedAtAction(nameof(GetById), new { orderId = id }, new { orderId = id });
        }

        [HttpGet("{orderId:int}")]
        public async Task<IActionResult> GetById(int orderId)
        {
            var order = await _mediator.Send(new GetOrderByIdQuery(orderId));
            return order is null ? NotFound() : Ok(order);
        }

        [HttpGet]
        public async Task<IActionResult> GetPaged(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] int? userId = null,
            [FromQuery] string? orderNumber = null,
            [FromQuery] short? status = null
        )
        {
            var pagination = new PaginationParams { Page = page, PageSize = pageSize };
            var filter = new OrderFilterParams { UserId = userId, OrderNumber = orderNumber, Status = status };

            var result = await _mediator.Send(new GetAllOrdersQuery(filter, pagination));
            return Ok(result);
        }

        [HttpPatch("{orderId:int}/status")]
        public async Task<IActionResult> UpdateStatus(int orderId, [FromBody] UpdateStatusBody body)
        {
            var ok = await _mediator.Send(new UpdateOrderStatusCommand(orderId, body.NewStatus, body.Notes));
            return ok ? NoContent() : NotFound();
        }

        [HttpGet("user/{userId:int}")]
        public async Task<IActionResult> GetByUser(int userId,[FromQuery] int page = 1,[FromQuery] int pageSize = 10)
        {
            var pagination = new PaginationParams { Page = page, PageSize = pageSize };
            var result = await _mediator.Send(new GetOrdersByUserQuery(userId, pagination));
            return Ok(result);
        }
        [HttpGet("{orderId:int}/status-history")]
        public async Task<IActionResult> StatusHistory(int orderId)
        {
            var history = await _mediator.Send(new GetOrderStatusHistoryQuery(orderId));
            return Ok(history);
        }

        [HttpGet("summary")]
        public async Task<IActionResult> Summary()
        {
            var result = await _mediator.Send(new GetOrderSummaryQuery());
            return Ok(result);
        }

        [HttpPost("{orderId:int}/cancel")]
        public async Task<IActionResult> Cancel(int orderId, [FromBody] string? notes)
        {
            var ok = await _mediator.Send(new CancelOrderCommand(orderId, notes));
            return ok ? NoContent() : NotFound();
        }

        public class UpdateStatusBody
        {
            public short NewStatus { get; set; }
            public string? Notes { get; set; }
        }
    }
}
