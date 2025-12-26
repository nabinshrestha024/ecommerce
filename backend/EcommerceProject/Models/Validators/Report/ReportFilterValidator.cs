using EcommerceProject.Filters;
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
        }
    }
}
