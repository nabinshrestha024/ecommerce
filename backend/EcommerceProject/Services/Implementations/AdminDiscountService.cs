using EcommerceProject.Models.DTOs.Discount;
using EcommerceProject.Models.Entities;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using FluentValidation;

namespace EcommerceProject.Services.Implementations
{
    public class AdminDiscountService : IAdminDiscountService
    {
        private readonly IAdminDiscountRepository _adminRepo;
        private readonly IValidator<CreateDiscountDto> _validator;

        public AdminDiscountService(IAdminDiscountRepository adminrepo, IValidator<CreateDiscountDto> validator)
        {
            _adminRepo = adminrepo;
            _validator = validator;

        }


        public async Task<IEnumerable<DiscountDto>> GetAllAsync()
        {
            return await _adminRepo.GetAllAsync();
        }

        public async Task<int> CreateAsync(CreateDiscountDto dto)
        {
            if (dto.StartDate >= dto.EndDate)
                throw new Exception("Start date must be earlier than end date.");

            return await _adminRepo.CreateAsync(dto);
        }

        public async Task AddDiscountToProductsAsync(int discountId, DiscountProductDto dto)
        {
            if (!dto.ProductIds.Any())
                throw new Exception("ProductIds cannot be empty.");

            await _adminRepo.AddDiscountToProductsAsync(discountId, dto.ProductIds);
        }
        public async Task AddDiscountToVariantsAsync(int discountId, DiscountVariantsDto dto)
        {
            if (!dto.VariantIds.Any())
                throw new Exception("VariantIds cannot be empty.");

            await _adminRepo.AddDiscountToVariantsAsync(discountId, dto.VariantIds);
        }


        public async Task UpdateAsync(UpdateDiscountDto dto)
        {
            await _adminRepo.UpdateAsync(dto);
        }

        public async Task ToggleAsync(int discountId, bool isActive)
        {
            if(discountId <= 0)
            {
                throw new ValidationException("Invalid discount Id");
            }
            await _adminRepo.ToggleAsync(discountId, isActive);
        }

        private async Task Validate(CreateDiscountDto dto)
        {
            var result = await _validator.ValidateAsync(dto);
            if (!result.IsValid)
            {
                throw new ValidationException(result.Errors);
            }

        }




    }
}
