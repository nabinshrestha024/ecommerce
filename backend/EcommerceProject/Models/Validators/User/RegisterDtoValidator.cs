using EcommerceProject.Models.DTOs.User;
using FluentValidation;

namespace EcommerceProject.Models.Validators.User
{
    public class RegisterDtoValidator : AbstractValidator<RegisterDto>
    {
        public RegisterDtoValidator()
        {
            RuleFor(x => x.FullName)
                .NotNull().WithMessage("Full name is required")
                .MinimumLength(5).WithMessage("Fullname must be at lest 5 characters");

            RuleFor(x => x.Email)
                .NotNull().WithMessage("Email is required")
                .EmailAddress().WithMessage("Invalid email format");

            RuleFor(x => x.Password)
                .NotNull().WithMessage("password is required")
                .MinimumLength(6).WithMessage("Password must be at least 8 characters")
                .Matches("[A-Z]").WithMessage("Password must content atleast 1 Uppercase letter")
                .Matches("[a-z]").WithMessage("Password must contenrt atleat 1 lowwercase letter")
                .Matches("[1-9]").WithMessage("Password must content atleast 1 number");
        }
    }
}
