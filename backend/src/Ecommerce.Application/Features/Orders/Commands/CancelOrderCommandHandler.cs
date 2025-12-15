using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Application.Common.Interfaces;
using MediatR;

namespace Ecommerce.Application.Features.Orders.Commands
{
    public class CancelOrderCommandHandler : IRequestHandler<CancelOrderCommand, bool>
    {
        private readonly IOrderRepository _repository;

        public CancelOrderCommandHandler(IOrderRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(CancelOrderCommand request, CancellationToken cancellationToken)
        {
            return await _repository.CancelAsync(request.OrderId);
        }
    }
}
