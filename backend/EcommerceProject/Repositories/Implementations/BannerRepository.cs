using Dapper;
using EcommerceProject.Models.DTOs.Banners;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Database;
using System.Data;  


namespace EcommerceProject.Repositories.Implementations;

public class BannerRepository: IBannerRepository
{
    private readonly ISqlConnectionFactory _db;
    public BannerRepository(ISqlConnectionFactory db)
    {
        _db = db;
    }

    public async Task<IEnumerable<BannerResponseDto>> GetAllBannerAsync(string sliderCode)
    {
        using var connection = _db.CreateConnection();
        return await connection.QueryAsync<BannerResponseDto>(
            "spBanners_GetActiveBanners",
            new { SliderCode = sliderCode },
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task<int> CreateBannerAsync(CreateBannerDto dto)
    {
        using var connection = _db.CreateConnection();
        
        return await connection.ExecuteScalarAsync<int>(
            "spBanners_CreateBanner",
            dto,
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task UpdateBannerAsync(UpdateBannerDto dto)
    {
        using var connection = _db.CreateConnection();
        await connection.ExecuteAsync(
            "spBanners_UpdateBanner",
            dto,
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task DeleteBannerAsync(int bannerId)
    {
        using var connection = _db.CreateConnection();
        await connection.ExecuteAsync(
            "spBanners_DeleteBanner",
            new { BannerId = bannerId },
            commandType: CommandType.StoredProcedure
        );
    }
}
