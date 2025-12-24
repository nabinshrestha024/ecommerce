using FluentValidation;

namespace EcommerceProject.Models.Validators.Wishlist
{
    public class GetWishlistValidator : AbstractValidator<int>
    {
        public GetWishlistValidator()
        {
            RuleFor(userId => userId)
                .GreaterThan(0)
                .WithMessage("Invalid user id.");
        }
    }
}
