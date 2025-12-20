using EcommerceProject.Models.DTOs.Discount;
using EcommerceProject.Models.Entities;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;

namespace EcommerceProject.Services.Implementations
{
    public class AdminDiscountService : IAdminDiscountService
    {
        private readonly IAdminDiscountRepository _adminRepo;

        public AdminDiscountService(IAdminDiscountRepository adminrepo)
        {
            _adminRepo = adminrepo;
        }

        public async Task CreateAsync(CreateDiscountDto dto)
        {
            if(dto.EndDate <= dto.StartDate)
            {
                throw new ArgumentException("End date must be after start date");

            }

            if(dto.DiscountValue <= 0)
            {
                throw new ArgumentException("Discount value must be greater than zero");

            }

            await _adminRepo.CreateAsync(dto);

        }

        public async Task UpdateAsync(int discountId, CreateDiscountDto dto)
        {
            if(dto.EndDate <= dto.StartDate)
            {
                throw new ArgumentException("Invalid discount date range ");
            }
           await _adminRepo.UpdateAsync(discountId, dto);

        }

        public async Task ToggleAsync(int discountId, bool isActive)
        {
            await _adminRepo.ToggleAsync(discountId, isActive);
        }

        public async Task<IEnumerable<Discount>> GetAllAsync()
        {
            return await _adminRepo.GetAllAsync();
        }
    }
}
