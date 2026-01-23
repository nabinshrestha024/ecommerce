using EcommerceProject.Models.DTOs.Report;

namespace EcommerceProject.Filters
{
    public class ReportFilter
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }

        public ReportPeriod? Period { get; set; }
        public string sortOrder { get; set; }
    }
}
