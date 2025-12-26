using EcommerceProject.Models.DTOs.Orders;
using FluentValidation;

namespace EcommerceProject.Models.Validators.Order
{
    public class CreateOrderRequestValidator : AbstractValidator<CreateOrderRequestDto>
    {
        public CreateOrderRequestValidator()
        {
            RuleFor(x => x.ShippingAddress)
                .NotEmpty()
                .MaximumLength(300);

            RuleFor(x => x.ShippingCity)
                .NotEmpty()
                .MaximumLength(50);

            RuleFor(x => x.ShippingPhone)
                .NotEmpty()
                .MaximumLength(20)
                .Matches(@"^[0-9+\- ]+$")
                .WithMessage("Invalid phone number format.");

            // RuleFor(x => x.PaymentMethodId)
            //     .GreaterThan(0)
            //     .WithMessage("Payment method is required.");

            RuleFor(x => x.ShippingName)
                .MaximumLength(100)
                .When(x => !string.IsNullOrWhiteSpace(x.ShippingName));

            // RuleFor(x => x.Notes)
            //     .MaximumLength(500);
        }
    }
}
