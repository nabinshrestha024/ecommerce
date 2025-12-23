using EcommerceProject.Models.DTOs.Shipments;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IShipmentRepository
    {
        Task CreateAsync(CreateShipmentDto dto, CancellationToken ct);
        Task<ShipmentDto?> GetByOrderIdAsync(int orderId, CancellationToken ct);
        Task UpdateStatusAsync(int shipmentId, string status, CancellationToken ct);
    }
}
