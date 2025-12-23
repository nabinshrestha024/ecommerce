using EcommerceProject.Models.DTOs.Orders;
using FluentValidation;

namespace EcommerceProject.Models.Validators.Order
{
    public class UpdateOrderStatusValidator : AbstractValidator<UpdateOrderStatusDto>
    {
        private static readonly string[] AllowedStatuses =
        {
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled"
        };

        public UpdateOrderStatusValidator()
        {
            RuleFor(x => x.Status)
                .NotEmpty()
                .Must(s => AllowedStatuses.Contains(s))
                .WithMessage($"Status must be one of: {string.Join(", ", AllowedStatuses)}");
        }
    }
}
