using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Application.DTOs.Order;
using MediatR;

namespace Ecommerce.Application.Features.Orders.Queries
{
    public record GetOrderStatusHistoryQuery(int OrderId)
    : IRequest<IEnumerable<OrderStatusHistoryDto>>;

}
