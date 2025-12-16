using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Application.Common.Interfaces;
using Ecommerce.Application.DTOs.Order;
using MediatR;

namespace Ecommerce.Application.Features.Orders.Queries
{
    public class GetOrderStatusHistoryQueryHandler
    : IRequestHandler<GetOrderStatusHistoryQuery, IEnumerable<OrderStatusHistoryDto>>
    {
        private readonly IOrderRepository _orders;
        private readonly IMapper _mapper;

        public GetOrderStatusHistoryQueryHandler(IOrderRepository orders, IMapper mapper)
        {
            _orders = orders;
            _mapper = mapper;
        }

        public async Task<IEnumerable<OrderStatusHistoryDto>> Handle(
            GetOrderStatusHistoryQuery request, CancellationToken cancellationToken)
        {
            var order = await _orders.GetByIdAsync(request.OrderId);
            if (order == null) return Enumerable.Empty<OrderStatusHistoryDto>();

            return order.StatusHistories.Select(_mapper.Map<OrderStatusHistoryDto>);
        }
    }

}
