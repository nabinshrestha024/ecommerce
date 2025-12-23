using EcommerceProject.Models.DTOs.Shipments;
using FluentValidation;

namespace EcommerceProject.Models.Validators.Shipment
{
    public class CreateShipmentValidator : AbstractValidator<CreateShipmentDto>
    {
        public CreateShipmentValidator()
        {
            RuleFor(x => x.OrderId)
                .GreaterThan(0);

            RuleFor(x => x.ShippingCost)
                .GreaterThanOrEqualTo(0)
                .When(x => x.ShippingCost.HasValue);

            RuleFor(x => x.Notes)
                .MaximumLength(500);
        }
    }
}
