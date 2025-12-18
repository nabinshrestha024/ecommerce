using FluentValidation;
using EcommerceProject.Models.DTOs.Vendor;

namespace EcommerceProject.Models.Validators.Vendor
{
    public class CreateVendorRequestValidator : AbstractValidator<CreateVendorRequestDto>
    {
        public CreateVendorRequestValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Vendor name is required")
                .MaximumLength(200).WithMessage("Vendor name cannot exceed 200 characters");

            RuleFor(x => x.ContactPerson)
                .MaximumLength(100).WithMessage("Contact person name cannot exceed 100 characters")
                .When(x => !string.IsNullOrEmpty(x.ContactPerson));

            RuleFor(x => x.Phone)
                .MaximumLength(20).WithMessage("Phone cannot exceed 20 characters")
                .Matches(@"^[+]?[0-9\s\-\(\)]{10,20}$").WithMessage("Invalid phone number format")
                .When(x => !string.IsNullOrEmpty(x.Phone));

            RuleFor(x => x.Email)
                .MaximumLength(100).WithMessage("Email cannot exceed 100 characters")
                .EmailAddress().WithMessage("Invalid email format")
                .When(x => !string.IsNullOrEmpty(x.Email));

            RuleFor(x => x.Address)
                .MaximumLength(300).WithMessage("Address cannot exceed 300 characters")
                .When(x => !string.IsNullOrEmpty(x.Address));
        }
    }
}