using EcommerceProject.Models.DTOs.Common;
using EcommerceProject.Models.DTOs.EcommerceProject.Models.DTOs;
using EcommerceProject.Models.DTOs.Review;
using EcommerceProject.Models.Validators.Review;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using FluentValidation;

namespace EcommerceProject.Services.Implementations
{
    public class ReviewService : IReviewService
    {
        private readonly IReviewRepository _repo;

        public ReviewService(IReviewRepository repo)
        {
            _repo = repo;
        }

        public async Task AddProductReviewAsync(int productId, int userId, CreateReviewDto dto, CancellationToken ct)
        {
            await new CreateReviewValidator().ValidateAndThrowAsync(dto, ct);
            await _repo.CreateProductReviewAsync(productId, userId, dto, ct);
        }

        public async Task<IEnumerable<ReviewDto>> GetProductReviewsAsync(int productId, CancellationToken ct)
        {
            return await _repo.GetProductReviewsAsync(productId, ct);
        }

        public async Task AddWebsiteReviewAsync(int userId, CreateReviewDto dto, CancellationToken ct)
        {
            await new CreateReviewValidator().ValidateAndThrowAsync(dto, ct);
            await _repo.CreateWebsiteReviewAsync(userId, dto, ct);
        }

        public async Task<IEnumerable<ReviewDto>> GetWebsiteReviewsAsync(CancellationToken ct)
        {
            return await _repo.GetWebsiteReviewsAsync(ct);
        }

        public async Task DeleteReviewByUserAsync(int reviewId, int userId, CancellationToken ct)
        {
            await _repo.DeleteReviewByUserAsync(reviewId, userId, ct);
        }

        public async Task DeleteReviewByAdminAsync(int reviewId, CancellationToken ct)
        {
            await _repo.DeleteReviewByAdminAsync(reviewId, ct);
        }
        public async Task DeleteWebsiteReviewByUserAsync(int websiteReviewId, int userId, CancellationToken ct)
        {
            await _repo.DeleteWebsiteReviewByUserAsync(websiteReviewId, userId, ct);
        }

        public async Task DeleteWebsiteReviewByAdminAsync(int websiteReviewId, CancellationToken ct)
        {
            await _repo.DeleteWebsiteReviewByAdminAsync(websiteReviewId, ct);
        }
        public Task<PagedResult<AdminReviewRowDto>> AdminGetProductReviewsAsync(PaginationDto pagination, CancellationToken ct)
        {
            return _repo.AdminGetProductReviewsAsync(pagination, ct);
        }
        public Task<PagedResult<AdminReviewRowDto>> AdminGetWebsiteReviewsAsync(PaginationDto pagination, CancellationToken ct)
        {
            return _repo.AdminGetWebsiteReviewsAsync(pagination, ct);
        }

    }
}
