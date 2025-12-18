using EcommerceProject.Models.DTOs.Product;
using FluentValidation;

namespace EcommerceProject.Models.Validators.Product
{
    public class UpdateProductRequestValidator : AbstractValidator<UpdateProductRequest>
    {
        public UpdateProductRequestValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Slug).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Price).GreaterThan(0);
            RuleFor(x => x.CategoryID).GreaterThan(0);
            RuleFor(x => x.SKU).NotEmpty().MaximumLength(50);
            RuleFor(x => x.ShortDescription).MaximumLength(500);
            RuleFor(x => x.ProductImageURL).MaximumLength(500);
        }
    }
}
