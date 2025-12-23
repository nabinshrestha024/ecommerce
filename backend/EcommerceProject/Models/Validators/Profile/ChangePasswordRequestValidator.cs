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
    }  
}
}