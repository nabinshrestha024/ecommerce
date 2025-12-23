using FluentValidation;
using EcommerceProject.Models.DTOs.Profile;

namespace EcommerceProject.Models.Validators.Profile
{
public class ChangePasswordRequestValidator : AbstractValidator<ChangePasswordRequestDto>
{
    public ChangePasswordRequestValidator()
    {
        RuleFor(x => x.CurrentPassword)
            .NotEmpty()
            .WithMessage("Current password is required.");

        RuleFor(x => x.NewPassword)
            .NotEmpty()
            .WithMessage("New password is required.");
            //.MinimumLength(8)
            //.WithMessage("New password must be at least 8 characters long.")
            //.Matches(@"[A-Z]+")
            //.WithMessage("New password must contain at least one uppercase letter.")
            //.Matches(@"[a-z]+")
            //.WithMessage("New password must contain at least one lowercase letter.")
            //.Matches(@"[0-9]+")
            //.WithMessage("New password must contain at least one digit.")
            //.Matches(@"[\W_]+")
            //.WithMessage("New password must contain at least one special character.");
    }  
}
}