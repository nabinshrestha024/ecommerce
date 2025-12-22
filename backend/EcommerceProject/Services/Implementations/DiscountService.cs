using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.Cart;
using EcommerceProject.Models.Entities;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;


namespace EcommerceProject.Services.Implementations
{
    public class DiscountService : IDiscountService
    {
        private readonly IDiscountRepository _discountRepo;

        public DiscountService(IDiscountRepository discountRepo)
        {
            _discountRepo = discountRepo;
        }

        public async Task<decimal> ApplyDiscountsAsync(int userId, ShoppingCartItem item)
        {
            decimal totalDiscount = 0;
            var discounts = await _discountRepo.GetActiveDiscountsAsync(item.ProductId);

            foreach(var discount in discounts)
            {
                if(discount.MinQuantity.HasValue && item.Quantity < discount.MinQuantity)
                {
                    continue;
                }

                var (userUsage, totalUsage) = await _discountRepo.GetUsageAsync(discount.DiscountId, userId);
                if(discount.MaxUsage.HasValue && totalUsage >= discount.MaxUsage)
                {
                    continue;
                }
                if(discount.MaxUsage.HasValue && totalUsage >= discount.MaxUsage)
                {
                    continue;
                }

                decimal discountAmount = discount.IsPercentage ? (item.Price * item.Quantity) * (discount.DiscountValue / 100) : discount.DiscountValue;
                totalDiscount += discountAmount;

                await _discountRepo.AddUsageAsync(discount.DiscountId, userId);


            }
            return totalDiscount;



        }

    }
}
