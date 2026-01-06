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
        private readonly IUrlService _urlService;

        public ReviewService(IReviewRepository repo, IUrlService urlService)
        {
            _repo = repo;
            _urlService = urlService;
        }

        public async Task AddProductReviewAsync(int productId, int userId, CreateReviewDto dto, CancellationToken ct)
        {
            await new CreateReviewValidator().ValidateAndThrowAsync(dto, ct);
            await _repo.CreateProductReviewAsync(productId, userId, dto, ct);
        }

        public async Task<IEnumerable<ReviewDto>> GetProductReviewsAsync(int productId, CancellationToken ct)
        {
            var reviews = await _repo.GetProductReviewsAsync(productId, ct);
            foreach (var r in reviews)
            {
                r.UserImageUrl = _urlService.ToAbsoluteUrl(r.UserImageUrl);
            }

            return reviews;
        }

        public async Task AddWebsiteReviewAsync(int userId, CreateReviewDto dto, CancellationToken ct)
        {
            await new CreateReviewValidator().ValidateAndThrowAsync(dto, ct);
            await _repo.CreateWebsiteReviewAsync(userId, dto, ct);
        }

        public async Task<IEnumerable<ReviewDto>> GetWebsiteReviewsAsync(CancellationToken ct)
        {
            var reviews = await _repo.GetWebsiteReviewsAsync(ct);
            foreach (var r in reviews)
            {
                r.UserImageUrl = _urlService.ToAbsoluteUrl(r.UserImageUrl);
            }

            return reviews;
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
        public async Task<PagedResult<AdminReviewRowDto>> AdminGetProductReviewsAsync(PaginationDto pagination, CancellationToken ct)
        {
            var result = await _repo.AdminGetProductReviewsAsync(pagination, ct);

            foreach (var r in result.Items)
            {
                r.UserImageUrl = _urlService.ToAbsoluteUrl(r.UserImageUrl);
            }

            return result;
        }
        public async Task<PagedResult<AdminReviewRowDto>> AdminGetWebsiteReviewsAsync(PaginationDto pagination, CancellationToken ct)
        {
            var result = await _repo.AdminGetWebsiteReviewsAsync(pagination, ct);

            foreach (var r in result.Items)
            {
                r.UserImageUrl = _urlService.ToAbsoluteUrl(r.UserImageUrl);
            }

            return result;
        }

    }
}
