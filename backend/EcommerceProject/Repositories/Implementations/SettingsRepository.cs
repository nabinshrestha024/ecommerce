using System.Data;
using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.SystemSettings;
using EcommerceProject.Repositories.Interfaces;

namespace EcommerceProject.Repositories.Implementations
{
    public class SettingsRepository : ISettingsRepository
    {
        private readonly ISqlConnectionFactory _factory;

        public SettingsRepository(ISqlConnectionFactory factory)
        {
            _factory = factory;
        }

        public async Task<IEnumerable<SettingDto>> GetAllAsync()
        {
            using var conn = _factory.CreateConnection();
            return await conn.QueryAsync<SettingDto>(
                "spSettings_GetAll",
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task UpsertAsync(string key, string? value, string updatedBy)
        {
            using var conn = _factory.CreateConnection();
            await conn.ExecuteAsync(
                "spSettings_Upsert",
                new { Key = key, Value = value, UpdatedBy = updatedBy },
                commandType: CommandType.StoredProcedure
            );
        }
    }

}
