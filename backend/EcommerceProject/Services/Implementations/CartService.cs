using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.ShoppingCart;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using Microsoft.AspNetCore.Connections;
using System.Data;

namespace EcommerceProject.Services.Implementations
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;
        private readonly IUrlService _urlService;
        private readonly IProductVariantRepository _variantrepo;
        private readonly ISqlConnectionFactory _sqlConnectionFactory;
        private readonly INotificationService _notificationservice;
        public CartService(ICartRepository cartRepository, IProductRepository productRepository, IUrlService urlService, IProductVariantRepository variantrepo, ISqlConnectionFactory sqlConnectionFactory, INotificationService notificationservice)
        {
            _cartRepository = cartRepository;
            _productRepository = productRepository;
            _urlService = urlService;
            _variantrepo = variantrepo;
            _sqlConnectionFactory = sqlConnectionFactory;
            _notificationservice = notificationservice;

        }

        public async Task<IEnumerable<CartItemDto>> GetCartAsync(int userId)
        {
            if (userId <= 0)
                throw new ArgumentException("Invalid user");

            var result = await _cartRepository.GetCartAsync(userId);
            foreach (var item in result)
            {
                item.ProductImageUrl = _urlService.ToAbsoluteUrl(item.ProductImageUrl);
            }
            return result;
        }

        public async Task AddToCartAsync(int userId, int variantId, int quantity, CancellationToken ct = default)
        {
            var exists = await _variantrepo.ExistsAsync(variantId, ct);

            if (!exists)
            {
                throw new Exception($"Product variant cannot found");

            }



            var cartItems = await _cartRepository.GetCartAsync(userId);

            var cartItem = cartItems.FirstOrDefault(x => x.VariantId == variantId);


            if (cartItem != null)
            {

                var totalQuantity = cartItem.Quantity + quantity;




                cartItem.Quantity = totalQuantity;

                await _cartRepository.UpdateQuantityAsync(cartItem.CartId, totalQuantity);
            }
            else
            {
                await _cartRepository.AddToCartAsync(userId, variantId, quantity);

            }

        }

        public async Task UpdateQuantityAsync(int cartId, int quantity)
        {
            if (quantity <= 0)
            {
                throw new ArgumentException("Quantity must be greater than zero.");
            }


            await _cartRepository.UpdateQuantityAsync(cartId, quantity);
        }

        public async Task RemoveItemAsync(int cartId)
        {
            await _cartRepository.RemoveCartAsync(cartId);
        }

        public async Task<int> CheckoutAsync(int userId)
        {
            return await _cartRepository.CheckoutAsync(userId);
        }

        //public async Task<CheckoutsResponseDto> CheckoutSelectedItemsAsync(int userId,CheckoutsRequestDto request)
        //{

        //    return await _cartRepository.CheckoutSelectedItemsAsync(
        //        userId,request);
        //}

        public async Task<CheckoutsResponseDto> CheckoutSelectedItemsAsync(int userId, CheckoutsRequestDto request)
        {
            using var connection = _sqlConnectionFactory.CreateConnection();
            
            using var transaction = connection.BeginTransaction();

            CheckoutsResponseDto checkoutResult;

            try
            {
                checkoutResult = await _cartRepository.CheckoutSelectedItemsAsync(
                    userId, request, connection, transaction);

                await connection.ExecuteAsync(
                "spNotifications_Create",
                new
                {
                    UserId = userId,
                    Title = "Order Placed Successfully",
                    Message = $"Your order #{checkoutResult.OrderId} has been placed successfully.",
                    OrderId = checkoutResult.OrderId
                },
                transaction: transaction,
                commandType: CommandType.StoredProcedure
                );

                transaction.Commit();
            }
            catch
            {
                transaction.Rollback();
                throw;
            }

            // ✅ ONLY ONE PLACE for notification
            await _notificationservice.NotifyUserAsync(
                userId,
                "Order Placed Successfully",
                $"Your order #{checkoutResult.OrderId} has been placed successfully.",
                checkoutResult.OrderId,
                sendEmail: false,
                CancellationToken.None
            );

            return checkoutResult;
        }

    }
}
