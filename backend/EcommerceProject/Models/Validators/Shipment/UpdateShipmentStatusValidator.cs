using EcommerceProject.Models.DTOs.Shipments;
using FluentValidation;

namespace EcommerceProject.Models.Validators.Shipment
{
    public class UpdateShipmentStatusValidator : AbstractValidator<UpdateShipmentStatusDto>
    {
        private static readonly string[] AllowedStatuses =
        {
            "Pending",
            "Packed",
            "Shipped",
            "InTransit",
            "Delivered",
            "Returned"
        };

        public UpdateShipmentStatusValidator()
        {
            RuleFor(x => x.Status)
                .NotEmpty()
                .Must(s => AllowedStatuses.Contains(s))
                .WithMessage("Invalid shipment status.");
        }
    }
}
