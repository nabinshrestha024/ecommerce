using FluentValidation;
using EcommerceProject.Models.DTOs.Profile;

public class UserContextValidator : AbstractValidator<int>
{
    public UserContextValidator()
    {
        RuleFor(userId => userId)
            .GreaterThan(0).WithMessage("UserId must be a positive integer.");
    }
}