using System.Data;
using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.Shipments;
using EcommerceProject.Repositories.Interfaces;

namespace EcommerceProject.Repositories.Implementations
{
    public class ShipmentRepository : IShipmentRepository
    {
        private readonly ISqlConnectionFactory _db;

        public ShipmentRepository(ISqlConnectionFactory db)
        {
            _db = db;
        }

        public async Task CreateAsync(CreateShipmentDto dto, CancellationToken ct)
        {
            using var conn = _db.CreateConnection();

            await conn.ExecuteAsync(
                "spShipments_Create",
                dto,
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<ShipmentDto?> GetByOrderIdAsync(int orderId, CancellationToken ct)
        {
            using var conn = _db.CreateConnection();

            return await conn.QueryFirstOrDefaultAsync<ShipmentDto>(
                "spShipments_GetByOrderId",
                new { OrderId = orderId },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task UpdateStatusAsync(int shipmentId, string status, CancellationToken ct)
        {
            using var conn = _db.CreateConnection();

            await conn.ExecuteAsync(
                "spShipments_UpdateStatus",
                new { ShipmentId = shipmentId, Status = status },
                commandType: CommandType.StoredProcedure
            );
        }
    }
}
