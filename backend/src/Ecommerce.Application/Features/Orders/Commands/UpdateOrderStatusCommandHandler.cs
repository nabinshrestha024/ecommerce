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
        private readonly IOrderRepository _repository;

        public UpdateOrderStatusCommandHandler(IOrderRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(UpdateOrderStatusCommand request, CancellationToken cancellationToken)
        {
            var dto = request.Order;
            return await _repository.UpdateStatusAsync(
                dto.OrderID,
                dto.PaymentStatus,
                dto.FulfillmentStatus
            );
        }
    }

}
