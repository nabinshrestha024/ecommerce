using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.Banners;
using EcommerceProject.Repositories.Interfaces;
using System.Data;

namespace EcommerceProject.Repositories.Implementations
{
    public class BannerRepository : IBannerRepository
    {
        private readonly ISqlConnectionFactory _db;

        public BannerRepository(ISqlConnectionFactory db)
        {
            _db = db;
        }

        public async Task<IEnumerable<BannerResponseDto>> GetAllBannerAsync()
        {
            using var connection = _db.CreateConnection();
            return await connection.QueryAsync<BannerResponseDto>(
                "spBanners_GetActiveBanners",
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<BannerResponseDto?> GetByIdAsync(int bannerId)
        {
            using var connection = _db.CreateConnection();
            return await connection.QueryFirstOrDefaultAsync<BannerResponseDto>(
                "spBanners_GetById",
                new { BannerId = bannerId },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<int> CreateBannerAsync(CreateBannerDto dto, string imageUrl)
        {
            using var connection = _db.CreateConnection();
            var parameters = new
            {
                dto.Title,
                dto.Description,
                dto.RedirectUrl,
                dto.SortOrder,
                dto.IsActive,
                ImageUrl = imageUrl
            };

            return await connection.ExecuteScalarAsync<int>(
                "spBanners_CreateBanner",
                parameters,
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task UpdateBannerAsync(UpdateBannerDto dto)
        {
            using var connection = _db.CreateConnection();
            await connection.ExecuteAsync(
                "spBanners_UpdateBanner",
                new
                {
                    dto.BannerId,
                    dto.Title,
                    dto.Description,
                    dto.RedirectUrl,
                    dto.SortOrder,
                    dto.IsActive
                },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task UpdateBannerImageAsync(int bannerId, string imageUrl)
        {
            using var connection = _db.CreateConnection();
            await connection.ExecuteAsync(
                "spBanners_UpdateImage",
                new { BannerId = bannerId, ImageUrl = imageUrl },
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
}
