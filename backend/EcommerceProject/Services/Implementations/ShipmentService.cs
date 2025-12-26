using EcommerceProject.Models.DTOs.Shipments;
using EcommerceProject.Models.Entities;
using EcommerceProject.Models.Validators.Shipment;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using FluentValidation;

namespace EcommerceProject.Services.Implementations
{
    public class ShipmentService : IShipmentService
    {
        private readonly IShipmentRepository _repo;
        private readonly INotificationService _notification;

        public ShipmentService(IShipmentRepository repo, INotificationService notification)
        {
            _repo = repo;
            _notification = notification;
        }

        public async Task CreateShipmentAsync(CreateShipmentDto dto, CancellationToken ct)
        {
            await new CreateShipmentValidator().ValidateAndThrowAsync(dto, ct);
            await _repo.CreateAsync(dto, ct);
        }

        public Task<ShipmentDto?> GetShipmentByOrderIdAsync(int orderId, CancellationToken ct)
        {
            return _repo.GetByOrderIdAsync(orderId, ct);
        }

        public async Task UpdateShipmentStatusAsync(int shipmentId, string status, CancellationToken ct)
        {
            var dto = new UpdateShipmentStatusDto { Status = status };
            await new UpdateShipmentStatusValidator().ValidateAndThrowAsync(dto, ct);

            await _repo.UpdateStatusAsync(shipmentId, status, ct);
            var info = await _repo.GetOrderAndUserByShipmentIdAsync(shipmentId, ct);
            if (info == null)
                return;

            var (orderId, userId) = info.Value;

            if (status == "Shipped")
            {
                await _notification.NotifyUserAsync(
                    userId,
                    "Order Shipped",
                    $"Your order #{orderId} has been shipped.",
                    orderId,
                    true,
                    ct);
            }

            if (status == "Delivered")
            {
                await _notification.NotifyUserAsync(
                    userId,
                    "Order Delivered",
                    $"Your order #{orderId} has been delivered.",
                    orderId,
                    true,
                    ct);
            }
        }
    }
}
