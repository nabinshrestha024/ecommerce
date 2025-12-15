using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Application.Features.Categories.Commands;
using FluentValidation;

namespace Ecommerce.Application.Features.Categories.Validator
{
    public class CreateCategoryCommandValidator : AbstractValidator<CreateCategoryCommand>
    {
        public CreateCategoryCommandValidator()
        {
            RuleFor(x => x.Category).NotNull();

            RuleFor(x => x.Category.Name)
                .NotEmpty().WithMessage("Category name is required")
                .MaximumLength(300);

            RuleFor(x => x.Category.Slug)
                .NotEmpty().WithMessage("Slug is required")
                .MaximumLength(300)
                .Matches("^[a-z0-9-]+$")
                .WithMessage("Slug must be lowercase and hyphen separated");

            RuleFor(x => x.Category.CategoryImage)
                .NotEmpty().WithMessage("Category image is required")
                .MaximumLength(500);

            RuleFor(x => x.Category.Description)
                .NotEmpty().WithMessage("Description is required")
                .MaximumLength(1000);

            RuleFor(x => x.Category.SortOrder)
                .GreaterThanOrEqualTo(0);

            RuleFor(x => x.Category.DisplayOrder)
                .GreaterThanOrEqualTo(0);

            RuleFor(x => x.Category.ParentCategoryId)
                .GreaterThanOrEqualTo(0)
                .When(x => x.Category.ParentCategoryId.HasValue);

            RuleFor(x => x.Category)
                .Must(c => c.ParentCategoryId != c.CategoryId)
                .WithMessage("Category cannot be its own parent");
        }
    }
}
