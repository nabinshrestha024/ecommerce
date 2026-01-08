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

        public async Task CreateAsync(CreateDiscountDto dto)
        {
            await Validate(dto);
            await _adminRepo.CreateAsync(dto);

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

        public async Task<int> AddDiscountAsync(CreateDiscountDto request)
        {
            
            var validationResult = await _validator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            
            return await _adminRepo.AddDiscountAsync(request);
        }



    }
}
