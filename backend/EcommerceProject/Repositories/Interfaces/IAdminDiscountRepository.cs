using EcommerceProject.Models.DTOs.Discount;
using EcommerceProject.Models.Entities;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IAdminDiscountRepository
    {
        Task<int> CreateAsync(CreateDiscountDto dto);
        Task UpdateAsync(UpdateDiscountDto dto);

        Task ToggleAsync(int discountId, bool isActive);
        Task<IEnumerable<DiscountDto>> GetAllAsync();

        Task AddDiscountToProductsAsync(int discountId, List<int> productIds);
        Task AddDiscountToVariantsAsync(int discountId, List<int> variantIds);

    }
}
