using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace Ecommerce.Application.Features.Orders.Commands
{
    public class CancelOrderCommand : IRequest<bool>
    {
        public int OrderId { get; set; }
    }
}
