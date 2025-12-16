using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Ecommerce.Application.Common.Interfaces;
using Ecommerce.Application.Common.Models;
using Ecommerce.Application.DTOs.Order;
using MediatR;

namespace Ecommerce.Application.Features.Orders.Queries
{
    public class GetOrdersByUserQueryHandler
    : IRequestHandler<GetOrdersByUserQuery, PagedResult<OrderDto>>
    {
        private readonly IOrderRepository _orders;
        private readonly IMapper _mapper;

        public GetOrdersByUserQueryHandler(IOrderRepository orders, IMapper mapper)
        {
            _orders = orders;
            _mapper = mapper;
        }

        public async Task<PagedResult<OrderDto>> Handle(GetOrdersByUserQuery request, CancellationToken cancellationToken)
        {
            var filter = new OrderFilterParams { UserId = request.UserId };

            var result = await _orders.GetPagedAsync(filter, request.Pagination);

            return new PagedResult<OrderDto>
            {
                Items = result.Items.Select(_mapper.Map<OrderDto>).ToList(),
                TotalCount = result.TotalCount,
                Page = result.Page,
                PageSize = result.PageSize
            };
        }
    }

}
