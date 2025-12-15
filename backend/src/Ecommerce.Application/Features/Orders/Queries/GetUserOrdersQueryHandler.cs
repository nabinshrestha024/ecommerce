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
    public class GetUserOrdersQueryHandler
        : IRequestHandler<GetUserOrdersQuery, IEnumerable<OrderSummaryDto>>
    {
        private readonly IOrderRepository _repository;

        public GetUserOrdersQueryHandler(IOrderRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<OrderSummaryDto>> Handle(
            GetUserOrdersQuery request,
            CancellationToken cancellationToken)
        {
            // get all orders (or later: a dedicated GetByUserId SP)
            var orders = await _repository.GetAllAsync();

            return orders
                .Where(o => o.UserId == request.UserId)
                .Select(o => new OrderSummaryDto
                {
                    OrderID = o.OrderID,
                    OrderNumber = o.OrderNumber,
                    Total = o.Total,
                    FulfillmentStatus = o.FulfillmentStatus,
                    PlacedAt = o.PlacedAt
                });
        }
    }
}
