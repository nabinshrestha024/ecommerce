using FluentValidation;
using EcommerceProject.Models.DTOs.PurchaseOrder;

namespace EcommerceProject.Models.Validators.PurchaseOrder
{
    public class CreatePurchaseOrderRequestValidator : AbstractValidator<CreatePurchaseOrderRequestDto>
    {
        public CreatePurchaseOrderRequestValidator()
        {
            RuleFor(x => x.VendorId)
                .GreaterThan(0).WithMessage("Vendor ID must be valid");

            RuleFor(x => x.Notes)
                .MaximumLength(500).WithMessage("Notes cannot exceed 500 characters")
                .When(x => !string.IsNullOrEmpty(x.Notes));

            RuleFor(x => x.Items)
                .NotEmpty().WithMessage("At least one item is required")
                .Must(items => items.Count > 0).WithMessage("At least one item is required");

            RuleForEach(x => x.Items).SetValidator(new PurchaseOrderItemRequestValidator());
        }
    }

    public class PurchaseOrderItemRequestValidator : AbstractValidator<PurchaseOrderItemRequestDto>
    {
        public PurchaseOrderItemRequestValidator()
        {
            RuleFor(x => x.ProductId)
                .GreaterThan(0).WithMessage("Product ID must be valid");

            RuleFor(x => x.Quantity)
                .GreaterThan(0).WithMessage("Quantity must be greater than 0")
                .LessThanOrEqualTo(10000).WithMessage("Quantity cannot exceed 10000");

            RuleFor(x => x.UnitCost)
                .GreaterThan(0).WithMessage("Unit cost must be greater than 0")
                .LessThanOrEqualTo(1000000).WithMessage("Unit cost cannot exceed 1,000,000");
        }
    }
}