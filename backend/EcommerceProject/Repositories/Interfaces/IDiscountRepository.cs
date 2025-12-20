using EcommerceProject.Models.Entities;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IDiscountRepository
    {
        Task<IEnumerable<Discount>> GetActiveDiscountsAsync(int productId);
        Task<(int userUsage, int totalUsage)> GetUsageAsync(int discountId, int userId);
        Task AddUsageAsync(int discountId, int userId);
    }
}
