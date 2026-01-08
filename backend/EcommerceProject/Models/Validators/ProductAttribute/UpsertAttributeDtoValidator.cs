using EcommerceProject.Models.DTOs.ProductAttribute;
using FluentValidation;

namespace EcommerceProject.Models.Validators.ProductAttribute
{
    public class UpsertAttributeDtoValidator : AbstractValidator<UpsertAttributeDto>
    {
        public UpsertAttributeDtoValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Attribute name is required.")
                .MaximumLength(100)
                .Must(name => !string.IsNullOrWhiteSpace(name))
                .WithMessage("Attribute name cannot be empty or whitespace.");


        }
    }

}
