using EcommerceProject.Models.DTOs.Category;
using FluentValidation;

namespace EcommerceProject.Models.Validators.Category
{
    public class CategoryValidator : AbstractValidator<CategoryUpsertDto>
    {
        public CategoryValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .MaximumLength(300);

            RuleFor(x => x.Description)
                .MaximumLength(1000);

            RuleFor(x => x.SortOrder)
                .GreaterThanOrEqualTo(0);
        }
    }

}
