using EcommerceProject.Models.DTOs.Discount;
using FluentValidation;

namespace EcommerceProject.Models.Validators.Discount
{
    public class CreateDiscountValidator : AbstractValidator<CreateDiscountDto>
    {
        public CreateDiscountValidator()
        {
            RuleFor(x => x.ProductId)
                .GreaterThan(0)
                .WithMessage("Product is required");

            RuleFor(x => x.Percentage)
                .GreaterThan(0)
                .LessThanOrEqualTo(100);

            RuleFor(x => x.EndDate)
                .GreaterThan(x => x.StartDate);

            RuleFor(x => x.MaxUsage)
                .GreaterThan(0)
                .When(x => x.MaxUsage.HasValue);

            RuleFor(x => x.PerUserLimit)
                .GreaterThan(0)
                .When(x => x.PerUserLimit.HasValue);
        }
    }
}
