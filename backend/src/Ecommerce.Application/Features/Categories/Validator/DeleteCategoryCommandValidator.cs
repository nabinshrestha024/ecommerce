using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Application.Features.Categories.Commands;
using FluentValidation;

namespace Ecommerce.Application.Features.Categories.Validator
{
    public class DeleteCategoryCommandValidator
        : AbstractValidator<DeleteCategoryCommand>
    {
        public DeleteCategoryCommandValidator()
        {
            RuleFor(x => x.CategoryId)
                .GreaterThan(0);
        }
    }
}
