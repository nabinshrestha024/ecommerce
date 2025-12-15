using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Application.DTOs.Order;
using MediatR;

namespace Ecommerce.Application.Features.Orders.Commands
{
    public class CreateOrderCommand : IRequest<int>
    {
        public CreateOrderDto Order { get; set; } = null!;
    }
}
