using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Application.Common.Interfaces;
using Ecommerce.Application.Common.Models;
using Ecommerce.Application.DTOs.Order;
using MediatR;
using AutoMapper;

namespace Ecommerce.Application.Features.Orders.Queries
{
    public class GetAllOrdersQueryHandler
         : IRequestHandler<GetAllOrdersQuery, PagedResult<OrderDto>>
    {
        private readonly IOrderRepository _orders;
        private readonly IMapper _mapper;

        public GetAllOrdersQueryHandler(IOrderRepository orders, IMapper mapper)
        {
            _orders = orders;
            _mapper = mapper;
        }

        public async Task<PagedResult<OrderDto>> Handle(GetAllOrdersQuery request, CancellationToken cancellationToken)
        {
            var result = await _orders.GetPagedAsync(request.Filter, request.Pagination);

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
