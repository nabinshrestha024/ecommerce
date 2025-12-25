using EcommerceProject.Models.DTOs.Product;
using FluentValidation;

namespace EcommerceProject.Models.Validators.Product
{
    public sealed class ProductUpdateValidator : AbstractValidator<ProductUpdateDto>
    {
        public ProductUpdateValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Slug).NotEmpty().MaximumLength(200);
            RuleFor(x => x.ShortDescription).MaximumLength(500);
            RuleFor(x => x.Price).GreaterThan(0);
            RuleFor(x => x.StockQuantity).GreaterThanOrEqualTo(0);
        }
    }
}
