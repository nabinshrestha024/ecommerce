using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace Ecommerce.Application.Features.Orders.Commands
{
    public record CancelOrderCommand(int OrderId, string? Notes) : IRequest<bool>;
}
