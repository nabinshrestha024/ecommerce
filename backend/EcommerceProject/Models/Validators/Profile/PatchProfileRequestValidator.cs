using FluentValidation;
using EcommerceProject.Models.DTOs.Profile;

public class PatchProfileRequestValidator : AbstractValidator<PatchProfileRequestDto>
{
    public PatchProfileRequestValidator()
    {
        RuleFor(x => x.FullName)
            .MaximumLength(100)
            .When(x => x.FullName != null);

        RuleFor(x => x.Phone)
            .MaximumLength(20)
            .Matches(@"^[0-9+]+$")
            .When(x => x.Phone != null);

        RuleFor(x => x.City)
            .MaximumLength(100)
            .When(x => x.City != null);

        RuleFor(x => x.Address)
            .MaximumLength(500)
            .When(x => x.Address != null);

        RuleFor(x => x.ProfileImageUrl)
            .MaximumLength(1024)
            .When(x => x.ProfileImageUrl != null);

        RuleFor(x => x.Gender)
            .Must(g => g == "Male" || g == "Female" || g == "Other")
            .When(x => x.Gender != null);

        RuleFor(x => x.Status)
            .InclusiveBetween((short)0, (short)1)
            .When(x => x.Status != null);
    }
}
