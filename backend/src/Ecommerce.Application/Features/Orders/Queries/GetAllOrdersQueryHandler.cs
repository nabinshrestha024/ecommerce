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
    public class GetAllOrdersQueryHandler
         : IRequestHandler<GetAllOrdersQuery, IEnumerable<OrderDto>>
    {
        private readonly IOrderRepository _repository;

        public GetAllOrdersQueryHandler(IOrderRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<OrderDto>> Handle(
            GetAllOrdersQuery request,
            CancellationToken cancellationToken)
        {
            var orders = await _repository.GetAllAsync();

            return orders.Select(o => new OrderDto
            {
                OrderID = o.OrderID,
                OrderNumber = o.OrderNumber,
                ShippingAddress = o.ShippingAddress,
                Total = o.Total,
                PaymentStatus = o.PaymentStatus,
                FulfillmentStatus = o.FulfillmentStatus,
                PlacedAt = o.PlacedAt
            });
        }
    }
}
