using System.ComponentModel;

namespace EcommerceProject.Models.DTOs.Report
{
    public enum ReportPeriod
    {
        [Description("lastWeek")]
        lastweek,
        [Description("lastmonth")]
        lastmonth
    }
}
