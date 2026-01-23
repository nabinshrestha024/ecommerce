using EcommerceProject.Models.DTOs.Discount;
using EcommerceProject.Models.Entities;

namespace EcommerceProject.Services.Interfaces
{
    public interface IAdminDiscountService
    {
        Task<int> CreateAsync(CreateDiscountDto dto);
        Task AddDiscountToProductsAsync(int discountId, DiscountProductDto dto);
        Task AddDiscountToVariantsAsync(int discountId, DiscountVariantsDto dto);

        Task UpdateAsync(UpdateDiscountDto dto);
        Task ToggleAsync(int discountId, bool isActive);
        Task<IEnumerable<DiscountDto>> GetAllAsync(string sortOrder);
    }
}
