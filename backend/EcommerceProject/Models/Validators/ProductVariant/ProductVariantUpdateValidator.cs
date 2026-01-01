using EcommerceProject.Models.DTOs.Product;
using FluentValidation;

namespace EcommerceProject.Models.Validators.ProductVariant
{
    public class ProductVariantUpdateValidator : AbstractValidator<ProductVariantUpdateDto>
    {
        public ProductVariantUpdateValidator()
        {
            RuleFor(x => x.Price)
                .GreaterThan(0)
                .WithMessage("Price must be greater than zero.");

            RuleFor(x => x.StockQuantity)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Stock cannot be negative.");
        }
    }
}
