using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Application.Features.Orders.Commands;
using FluentValidation;

namespace Ecommerce.Application.Features.Orders.Validators
{
    public class CreateOrderCommandValidator : AbstractValidator<CreateOrderCommand>
    {
        public CreateOrderCommandValidator()
        {
            RuleFor(x => x.Dto.UserId).GreaterThan(0);

            RuleFor(x => x.Dto.Items)
                .NotNull().NotEmpty().WithMessage("Order must have at least one item.");

            RuleForEach(x => x.Dto.Items).ChildRules(item =>
            {
                item.RuleFor(i => i.Quantity).GreaterThan(0);
                item.RuleFor(i => i.UnitPrice).GreaterThanOrEqualTo(0);
            });

            RuleFor(x => x.Dto.ShippingFee).GreaterThanOrEqualTo(0);
            RuleFor(x => x.Dto.DiscountAmount).GreaterThanOrEqualTo(0);
            RuleFor(x => x.Dto.TaxAmount).GreaterThanOrEqualTo(0);
        }
    }
}
