using EcommerceProject.Models.DTOs.Category;
using FluentValidation;

namespace EcommerceProject.Models.Validators.Category
{
    public class CategoryValidator : AbstractValidator<CategoryUpsertDto>
    {
        public CategoryValidator()
        {
            RuleFor(x => x.Name)
                .Must(x => !string.IsNullOrEmpty(x))
           .MaximumLength(300);

            RuleFor(x => x.Slug)
                .NotEmpty()
                .MaximumLength(300)
                .Matches("^[a-z0-9-]+$")
                .WithMessage("Slug must contain only lowercase letters, numbers, and hyphens.");

            RuleFor(x => x.Description)
                .MaximumLength(1000);

            RuleFor(x => x.SortOrder)
                .GreaterThanOrEqualTo(0);

            RuleFor(x => x.CategoryImageURL)
                .MaximumLength(500)
                .Must(BeValidUrl)
                .When(x => !string.IsNullOrWhiteSpace(x.CategoryImageURL))
                .WithMessage("Category image URL is not valid.");
        }

        private static bool BeValidUrl(string url)
            => Uri.TryCreate(url, UriKind.RelativeOrAbsolute, out _);
    }

}
