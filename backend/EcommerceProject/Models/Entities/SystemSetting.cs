namespace EcommerceProject.Models.Entities
{
    public class SystemSetting
    {
        public string Key { get; set; } = default!;
        public string? Value { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime UpdatedBy { get; set; }
    }
}
