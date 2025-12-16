using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Application.Common.Interfaces;
using MediatR;

namespace Ecommerce.Application.Features.Orders.Commands
{
    public class UpdateOrderStatusCommandHandler : IRequestHandler<UpdateOrderStatusCommand, bool>
    {
        private readonly IOrderRepository _orders;
        
        public UpdateOrderStatusCommandHandler(IOrderRepository orders)
        {
            _orders = orders;
        }

        public async Task<bool> Handle(UpdateOrderStatusCommand request, CancellationToken cancellationToken)
        {
            return await _orders.UpdateStatusAsync(
                request.OrderId,
                request.NewStatus,
                changedBy: null,
                notes: request.Notes
            );
        }
    }
}
