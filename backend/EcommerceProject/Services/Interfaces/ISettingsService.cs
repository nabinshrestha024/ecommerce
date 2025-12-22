using EcommerceProject.Models.DTOs.SystemSettings;

namespace EcommerceProject.Services.Interfaces
{
    public interface ISettingsService
    {
        Task<IEnumerable<SettingDto>> GetAllAsync();
        Task UpdateAsync(UpdateSettingsDto dto, string updatedBy);
    }
}
