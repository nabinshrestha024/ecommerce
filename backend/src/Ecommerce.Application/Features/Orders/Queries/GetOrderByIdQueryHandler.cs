using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Application.Common.Interfaces;
using Ecommerce.Application.DTOs.Order;
using MediatR;
using AutoMapper;

namespace Ecommerce.Application.Features.Orders.Queries
{
    public class GetOrderByIdQueryHandler : IRequestHandler<GetOrderByIdQuery, OrderDto?>
    {
        private readonly IOrderRepository _orders;
        private readonly IMapper _mapper;

        public GetOrderByIdQueryHandler(IOrderRepository orders, IMapper mapper)
        {
            _orders = orders;
            _mapper = mapper;
        }

        public async Task<OrderDto?> Handle(GetOrderByIdQuery request, CancellationToken cancellationToken)
        {
            var order = await _orders.GetByIdAsync(request.OrderId);
            return order is null ? null : _mapper.Map<OrderDto>(order);
        }
    }
}
