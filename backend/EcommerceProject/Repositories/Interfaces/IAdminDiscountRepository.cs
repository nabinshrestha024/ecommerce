using EcommerceProject.Models.DTOs.Discount;
using EcommerceProject.Models.Entities;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IAdminDiscountRepository
    {
        Task CreateAsync(CreateDiscountDto dto);
        Task UpdateAsync(int discountId, CreateDiscountDto dto);

        Task ToggleAsync(int discountId, bool isActive);
        Task<IEnumerable<Discount>> GetAllAsync();
    }
}
