using EcommerceProject.Models.DTOs.Product;
using FluentValidation;

namespace EcommerceProject.Models.Validators.ProductVariant
{
    public class ProductVariantCreateValidator : AbstractValidator<ProductVariantCreateDto>
    {
        public ProductVariantCreateValidator()
        {

            RuleFor(x => x.Price)
                .GreaterThan(0)
                .WithMessage("Price must be greater than zero.");

            RuleFor(x => x.StockQuantity)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Stock cannot be negative.");

            RuleFor(x => x.AttributeValueIds)
                .Must(list => list == null || list.Count > 0)
                .WithMessage("Attribute values cannot be an empty list.");
        }
    }
}
