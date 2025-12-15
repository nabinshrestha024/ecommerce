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

        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout(CreateOrderDto dto)
        {
            var id = await _mediator.Send(new CreateOrderCommand { Order = dto });
            return Ok(new { OrderId = id });
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserOrders(int userId)
        {
            return Ok(await _mediator.Send(new GetUserOrdersQuery(userId)));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _mediator.Send(new GetOrderByIdQuery(id)));
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, UpdateOrderStatusDto dto)
        {
            var result = await _mediator.Send(new UpdateOrderStatusCommand
            {
                Order = dto
            });

            return result ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Cancel(int id)
        {
            var result = await _mediator.Send(new CancelOrderCommand { OrderId = id });
            return result ? NoContent() : NotFound();
        }
    }
}
