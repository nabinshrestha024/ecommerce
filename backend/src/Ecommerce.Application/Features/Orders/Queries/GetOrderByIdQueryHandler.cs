using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Application.Common.Interfaces;
using Ecommerce.Application.DTOs.Order;
using MediatR;

namespace Ecommerce.Application.Features.Orders.Queries
{
    public class GetOrderByIdQueryHandler
        : IRequestHandler<GetOrderByIdQuery, OrderDto?>
    {
        private readonly IOrderRepository _repository;

        public GetOrderByIdQueryHandler(IOrderRepository repository)
        {
            _repository = repository;
        }

        public async Task<OrderDto?> Handle(
            GetOrderByIdQuery request,
            CancellationToken cancellationToken)
        {
            var order = await _repository.GetByIdAsync(request.OrderId);

            if (order == null)
                return null;

            return new OrderDto
            {
                OrderID = order.OrderID,
                OrderNumber = order.OrderNumber,
                ShippingAddress = order.ShippingAddress,
                Total = order.Total,
                PaymentStatus = order.PaymentStatus,
                FulfillmentStatus = order.FulfillmentStatus,
                PlacedAt = order.PlacedAt
            };
        }
    }
}
