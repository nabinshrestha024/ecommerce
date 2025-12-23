using EcommerceProject.Models.DTOs.Shipments;

namespace EcommerceProject.Services.Interfaces
{
    public interface IShipmentService
    {
        Task CreateShipmentAsync(CreateShipmentDto dto, CancellationToken ct);
        Task<ShipmentDto?> GetShipmentByOrderIdAsync(int orderId, CancellationToken ct);
        Task UpdateShipmentStatusAsync(int shipmentId, string status, CancellationToken ct);
    }
}
