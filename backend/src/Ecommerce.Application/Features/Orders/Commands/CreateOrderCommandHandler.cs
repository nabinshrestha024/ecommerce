using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Application.Common.Interfaces;
using Ecommerce.Domain.Entities;
using MediatR;

namespace Ecommerce.Application.Features.Orders.Commands
{
    public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, int>
    {
        private readonly IOrderRepository _repository;
        public CreateOrderCommandHandler(IOrderRepository repository)
        {
                _repository = repository;
        }

        public async Task<int> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            var dto = request.Order;

            var order = new Order
            {
                UserId = dto.UserId,
                ShippingAddress = dto.ShippingAddress,
                BillingAddress = dto.BillingAddress,
                SubTotal = dto.SubTotal,
                ShippingCost = dto.ShippingCost,
                Tax = dto.Tax,
                Total = dto.SubTotal + dto.ShippingCost + dto.Tax,
                PaymentStatus = 0,    
                FulfillmentStatus = 0,  
                PlacedAt = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow,
                Notes = dto.Notes
            };

            return await _repository.CreateAsync(order);
        }
    }
    
}
