using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Application.DTOs.Order;
using MediatR;

namespace Ecommerce.Application.Features.Orders.Queries
{
    public class GetOrderByIdQuery : IRequest<OrderDto?>
    {
        public int OrderId { get; }
        public GetOrderByIdQuery(int orderId) => OrderId = orderId;
    }
}
