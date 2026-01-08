using EcommerceProject.Models.DTOs.Discount;
using EcommerceProject.Models.Entities;

namespace EcommerceProject.Services.Interfaces
{
    public interface IAdminDiscountService
    {
        Task CreateAsync(CreateDiscountDto dto);
        Task UpdateAsync(UpdateDiscountDto dto);
        Task ToggleAsync(int discountId, bool isActive);
        Task<IEnumerable<DiscountDto>> GetAllAsync();
        Task<int> AddDiscountAsync(CreateDiscountDto request);
    }
}
