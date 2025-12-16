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
    public class GetOrderSummaryQueryHandler
        : IRequestHandler<GetOrderSummaryQuery, OrderSummaryDto>
    {
        private readonly IOrderRepository _orders;

        public GetOrderSummaryQueryHandler(IOrderRepository orders)
        {
            _orders = orders;
        }

        public async Task<OrderSummaryDto> Handle(
            GetOrderSummaryQuery request,
            CancellationToken cancellationToken)
        {
            return await _orders.GetSummaryAsync();
        }
    }
}
