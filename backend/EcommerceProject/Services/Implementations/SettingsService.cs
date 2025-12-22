using EcommerceProject.Models.DTOs.SystemSettings;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;

namespace EcommerceProject.Services.Implementations
{
    public class SettingsService : ISettingsService
    {
        private readonly ISettingsRepository _repo;

        public SettingsService(ISettingsRepository repo)
        {
            _repo = repo;
        }

        public Task<IEnumerable<SettingDto>> GetAllAsync()
            => _repo.GetAllAsync();

        public async Task UpdateAsync(UpdateSettingsDto dto, string updatedBy)
        {
            foreach (var item in dto.Items)
            {
                await _repo.UpsertAsync(item.Key, item.Value, updatedBy);
            }
        }
    }

}
