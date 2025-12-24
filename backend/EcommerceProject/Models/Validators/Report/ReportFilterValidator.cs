using EcommerceProject.Models.DTOs.Report;
using FluentValidation;

namespace EcommerceProject.Models.Validators.Report
{
    public class ReportFilterValidator : AbstractValidator<ReportFilter>
    {
        public ReportFilterValidator()
        {
            RuleFor(x => x.FromDate)
                .NotEmpty().WithMessage("FromDate is required")
                .LessThanOrEqualTo(x => x.ToDate).WithMessage("FromDate must be before ToDate");

            RuleFor(x => x.ToDate)
                .NotEmpty().WithMessage("ToDate is required");

            RuleFor(x => x.TopN)
                .GreaterThan(0).WithMessage("TopN must be greater than 0")
                .When(x => x.TopN.HasValue);

            RuleFor(x => x.Threshold)
                .GreaterThan(0).WithMessage("Threshold must be greater than 0")
                .When(x => x.Threshold.HasValue);
        }
    }
}
