using EcommerceProject.Models.DTOs.SystemSettings;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface ISettingsRepository
    {
        Task<IEnumerable<SettingDto>> GetAllAsync();
        Task UpsertAsync(string key, string? value, string updatedBy);
    }
}
