using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Application.Features.Categories.Commands;
using FluentValidation;

namespace Ecommerce.Application.Features.Categories.Validator
{
    public class UpdateCategoryCommandValidator
         : AbstractValidator<UpdateCategoryCommand>
    {
        public UpdateCategoryCommandValidator()
        {
            RuleFor(x => x.Category.CategoryId)
                .GreaterThan(0);

            RuleFor(x => x.Category.Name)
                .NotEmpty()
                .MaximumLength(300);

            RuleFor(x => x.Category.Slug)
                .NotEmpty()
                .MaximumLength(300)
                .Matches("^[a-z0-9-]+$");

            RuleFor(x => x.Category.CategoryImage)
                .NotEmpty();

            RuleFor(x => x.Category)
                .Must(c => c.ParentCategoryId != c.CategoryId)
                .WithMessage("Category cannot be its own parent");
        }
    }
}
