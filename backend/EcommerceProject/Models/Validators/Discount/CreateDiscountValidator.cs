using EcommerceProject.Models.DTOs.Discount;
using FluentValidation;

namespace EcommerceProject.Models.Validators.Discount
{
    public class CreateDiscountValidator : AbstractValidator<CreateDiscountDto>
    {
        public CreateDiscountValidator()
        {
            RuleFor(x => x.DiscountType)
            .NotEmpty()
            .Must(x => x == "Percentage" || x == "Flat")
            .WithMessage("DiscountType must be 'Percentage' or 'Flat'");

            RuleFor(x => x.DiscountValue)
                .GreaterThan(0)
                .WithMessage("DiscountValue must be greater than 0");

            RuleFor(x => x.StartDate)
                .LessThanOrEqualTo(x => x.EndDate)
                .WithMessage("StartDate must be before EndDate");

        }
    }
}
