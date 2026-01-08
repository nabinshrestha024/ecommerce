using EcommerceProject.Models.DTOs.ProductAttribute;
using FluentValidation;

namespace EcommerceProject.Models.Validators.ProductAttribute
{
    public class UpsertAttributeValueDtoValidator : AbstractValidator<UpsertAttributeValueDto>
    {
        public UpsertAttributeValueDtoValidator()
        {
            RuleFor(x => x.Value)
                .NotEmpty().WithMessage("Attribute value is required.")
                .MaximumLength(100)
                .Must(v => !string.IsNullOrWhiteSpace(v))
                .WithMessage("Attribute value cannot be empty or whitespace.");
        }
    }
}
