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
        private readonly IOrderRepository _orders;

        public CreateOrderCommandHandler(IOrderRepository orders)
        {
            _orders = orders;
        }

        public async Task<int> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            var dto = request.Dto;

            var subTotal = dto.Items.Sum(i => i.Quantity * i.UnitPrice);
            var total = subTotal + dto.ShippingFee + dto.TaxAmount - dto.DiscountAmount;

            var order = new Order
            {
                UserId = dto.UserId,
                OrderNumber = $"ORD-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid():N}".Substring(0, 28),
                Status = 0, // Created
                SubTotal = subTotal,
                ShippingFee = dto.ShippingFee,
                DiscountAmount = dto.DiscountAmount,
                TaxAmount = dto.TaxAmount,
                TotalAmount = total,
                BillingAddressId = dto.BillingAddressId,
                ShippingAddressId = dto.ShippingAddressId,
                Items = dto.Items.Select(i => new OrderItem
                {
                    ProductId = i.ProductId,
                    Quantity = i.Quantity,
                    UnitPrice = i.UnitPrice
                }).ToList()
            };

            return await _orders.CreateAsync(order);
        }
    }
}
