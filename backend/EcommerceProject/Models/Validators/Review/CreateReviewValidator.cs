using EcommerceProject.Models.DTOs.Review;
using FluentValidation;

namespace EcommerceProject.Models.Validators.Review
{

    public class CreateReviewValidator : AbstractValidator<CreateReviewDto>
    {
        public CreateReviewValidator()
        {
            RuleFor(x => x.Rating)
                .InclusiveBetween(1, 5);

            RuleFor(x => x.Content)
                .MaximumLength(4000);
        }
    }

}
