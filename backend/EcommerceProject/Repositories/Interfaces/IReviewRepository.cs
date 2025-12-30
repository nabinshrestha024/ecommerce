using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Review;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IReviewRepository
    {
        Task CreateProductReviewAsync(int productId, int userId, CreateReviewDto dto, CancellationToken ct);
        Task<IEnumerable<ReviewDto>> GetProductReviewsAsync(int productId, CancellationToken ct);
        Task CreateWebsiteReviewAsync(int userId, CreateReviewDto dto, CancellationToken ct);
        Task<IEnumerable<ReviewDto>> GetWebsiteReviewsAsync(CancellationToken ct);
        Task DeleteReviewByUserAsync(int reviewId, int userId, CancellationToken ct);
        Task DeleteReviewByAdminAsync(int reviewId, CancellationToken ct);
        Task DeleteWebsiteReviewByUserAsync(int websiteReviewId, int userId, CancellationToken ct);
        Task DeleteWebsiteReviewByAdminAsync(int websiteReviewId, CancellationToken ct);
        Task<PagedResult<AdminReviewRowDto>> AdminGetProductReviewsAsync(PaginationDto pagination, CancellationToken ct);
        Task<PagedResult<AdminReviewRowDto>> AdminGetWebsiteReviewsAsync(PaginationDto pagination, CancellationToken ct);

    }
}
