using FluentValidation;
using EcommerceProject.Models.DTOs.Stock;

namespace EcommerceProject.Models.Validators.Stock
{
    public class StockAdjustmentRequestValidator : AbstractValidator<StockAdjustmentRequestDto>
    {
        public StockAdjustmentRequestValidator()
        {
            RuleFor(x => x.ProductId)
                .GreaterThan(0).WithMessage("Product ID must be valid");

            RuleFor(x => x.AdjustmentQuantity)
                .NotEqual(0).WithMessage("Adjustment quantity cannot be 0")
                .InclusiveBetween(-10000, 10000).WithMessage("Adjustment quantity must be between -10000 and 10000");

            RuleFor(x => x.Reason)
                .NotEmpty().WithMessage("Reason is required")
                .MaximumLength(200).WithMessage("Reason cannot exceed 200 characters");

            RuleFor(x => x.Notes)
                .MaximumLength(500).WithMessage("Notes cannot exceed 500 characters")
                .When(x => !string.IsNullOrEmpty(x.Notes));
        }
    }
}