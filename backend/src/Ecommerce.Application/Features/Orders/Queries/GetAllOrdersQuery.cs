using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Application.Common.Models;
using Ecommerce.Application.DTOs.Order;
using MediatR;

namespace Ecommerce.Application.Features.Orders.Queries
{
    public record GetAllOrdersQuery(OrderFilterParams Filter, PaginationParams Pagination)
        : IRequest<PagedResult<OrderDto>>;
}
