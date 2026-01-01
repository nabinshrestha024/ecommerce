using EcommerceProject.Models.DTOs.Product;
using FluentValidation;

namespace EcommerceProject.Models.Validators.Product
{
    public class ProductCreateValidator : AbstractValidator<ProductCreateDto>
    {
        public ProductCreateValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
            RuleFor(x => x.ShortDescription).MaximumLength(500);
            
        }
    }
}
