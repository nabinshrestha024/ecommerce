using EcommerceProject.Models.DTOs.Shipments;
using EcommerceProject.Models.Validators.Shipment;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using FluentValidation;

namespace EcommerceProject.Services.Implementations
{
    public class ShipmentService : IShipmentService
    {
        private readonly IShipmentRepository _repo;

        public ShipmentService(IShipmentRepository repo)
        {
            _repo = repo;
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
        }
    }
}
