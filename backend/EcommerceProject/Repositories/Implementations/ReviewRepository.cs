using System.Data;
using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Review;
using EcommerceProject.Repositories.Interfaces;

namespace EcommerceProject.Repositories.Implementations
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly ISqlConnectionFactory _db;

        public ReviewRepository(ISqlConnectionFactory db)
        {
            _db = db;
        }

        public async Task CreateProductReviewAsync(int productId, int userId, CreateReviewDto dto, CancellationToken ct)
        {
            using var conn = _db.CreateConnection();
            await conn.ExecuteAsync(
                "spReviews_Create",
                new
                {
                    ProductId = productId,
                    UserId = userId,
                    dto.Content,
                    dto.Rating
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<ReviewDto>> GetProductReviewsAsync(int productId, CancellationToken ct)
        {
            using var conn = _db.CreateConnection();
            return await conn.QueryAsync<ReviewDto>(
                "spReviews_GetByProduct",
                new { ProductId = productId },
                commandType: CommandType.StoredProcedure);
        }

        public async Task CreateWebsiteReviewAsync(int userId, CreateReviewDto dto, CancellationToken ct)
        {
            using var conn = _db.CreateConnection();
            await conn.ExecuteAsync(
                "spWebsiteReviews_Create",
                new
                {
                    UserId = userId,
                    dto.Content,
                    dto.Rating
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<ReviewDto>> GetWebsiteReviewsAsync(CancellationToken ct)
        {
            using var conn = _db.CreateConnection();
            return await conn.QueryAsync<ReviewDto>(
                "spWebsiteReviews_GetAll",
                commandType: CommandType.StoredProcedure);
        }

        public async Task DeleteReviewByUserAsync(int reviewId, int userId, CancellationToken ct)
        {
            using var conn = _db.CreateConnection();
            await conn.ExecuteAsync(
                "spReviews_DeleteByUser",
                new
                {
                    ReviewId = reviewId,
                    UserId = userId
                },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task DeleteReviewByAdminAsync(int reviewId, CancellationToken ct)
        {
            using var conn = _db.CreateConnection();
            await conn.ExecuteAsync(
                "spReviews_DeleteByAdmin",
                new
                {
                    ReviewId = reviewId
                },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task DeleteWebsiteReviewByUserAsync(int websiteReviewId, int userId, CancellationToken ct)
        {
            using var conn = _db.CreateConnection();
            await conn.ExecuteAsync(
                "spWebsiteReviews_DeleteByUser",
                new
                {
                    WebsiteReviewId = websiteReviewId,
                    UserId = userId
                },
                commandType: CommandType.StoredProcedure
            );
        }
        public async Task DeleteWebsiteReviewByAdminAsync(int websiteReviewId, CancellationToken ct)
        {
            using var conn = _db.CreateConnection();
            await conn.ExecuteAsync(
                "spWebsiteReviews_DeleteByAdmin",
                new { WebsiteReviewId = websiteReviewId },
                commandType: CommandType.StoredProcedure
            );
        }
        public async Task<PagedResult<AdminReviewRowDto>> AdminGetProductReviewsAsync(
    PaginationDto pagination, CancellationToken ct)
        {
            using var conn = _db.CreateConnection();

            using var multi = await conn.QueryMultipleAsync(
                "spAdminReviews_GetPaged",
                new { pagination.Page, pagination.PageSize },
                commandType: CommandType.StoredProcedure
            );

            var items = (await multi.ReadAsync<AdminReviewRowDto>()).ToList();
            var total = await multi.ReadFirstAsync<int>();

            return new PagedResult<AdminReviewRowDto>(
                items,
                pagination.Page,
                pagination.PageSize,
                total
            );
        }

        public async Task<PagedResult<AdminReviewRowDto>> AdminGetWebsiteReviewsAsync(
            PaginationDto pagination, CancellationToken ct)
        {
            using var conn = _db.CreateConnection();

            using var multi = await conn.QueryMultipleAsync(
                "spAdminWebsiteReviews_GetPaged",
                new { pagination.Page, pagination.PageSize },
                commandType: CommandType.StoredProcedure
            );

            var items = (await multi.ReadAsync<AdminReviewRowDto>()).ToList();
            var total = await multi.ReadFirstAsync<int>();

            return new PagedResult<AdminReviewRowDto>(
                items,
                pagination.Page,
                pagination.PageSize,
                total
            );
        }

    }
}
