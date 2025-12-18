using System;
using System.Collections.Generic;
using System.Data;
using System.Text.Json;
using System.Threading.Tasks;
using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.PurchaseOrder;
using EcommerceProject.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace EcommerceProject.Repositories.Implementations
{
    public class PurchaseOrderRepository : IPurchaseOrderRepository
    {
        private readonly SqlConnectionFactory _connectionFactory;
        private readonly ILogger<PurchaseOrderRepository> _logger;

        public PurchaseOrderRepository(IConfiguration configuration, ILogger<PurchaseOrderRepository> logger)
        {
            _connectionFactory = new SqlConnectionFactory(configuration);
            _logger = logger;
        }

        public async Task<PurchaseOrderDetailDto?> GetPurchaseOrderByIdAsync(int poId)
        {
            try
            {
                using var connection = _connectionFactory.CreateConnection();
                
                using var multi = await connection.QueryMultipleAsync(
                    "spPurchaseOrders_GetById",
                    new { POId = poId },
                    commandType: CommandType.StoredProcedure
                );

                var purchaseOrder = await multi.ReadSingleOrDefaultAsync<PurchaseOrderDetailDto>();
                if (purchaseOrder == null)
                    return null;

                purchaseOrder.Items = (await multi.ReadAsync<PurchaseOrderItemDto>()).AsList();

                return purchaseOrder;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting purchase order by ID {POId}", poId);
                throw;
            }
        }

        public async Task<PagedResultDto<PurchaseOrderDto>> GetAllPurchaseOrdersAsync(int pageNumber = 1, int pageSize = 10, string? status = null)
        {
            try
            {
                using var connection = _connectionFactory.CreateConnection();
                
                using var multi = await connection.QueryMultipleAsync(
                    "spPurchaseOrders_GetPaged",
                    new 
                    { 
                        PageNumber = pageNumber, 
                        PageSize = pageSize, 
                        Status = status 
                    },
                    commandType: CommandType.StoredProcedure
                );

                var totalCount = await multi.ReadSingleAsync<int>();
                var purchaseOrders = (await multi.ReadAsync<PurchaseOrderDto>()).AsList();

                return new PagedResultDto<PurchaseOrderDto>
                {
                    Items = purchaseOrders,
                    TotalCount = totalCount,
                    PageNumber = pageNumber,
                    PageSize = pageSize
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all purchase orders");
                throw;
            }
        }

        public async Task<PurchaseOrderDetailDto> CreatePurchaseOrderAsync(CreatePurchaseOrderRequestDto request, int createdBy)
        {
            try
            {
                // Convert items to JSON for stored procedure
                var itemsJson = JsonSerializer.Serialize(request.Items);

                using var connection = _connectionFactory.CreateConnection();
                
                using var multi = await connection.QueryMultipleAsync(
                    "spPurchaseOrders_Create",
                    new
                    {
                        request.VendorId,
                        request.Notes,
                        CreatedBy = createdBy,
                        ItemsJson = itemsJson
                    },
                    commandType: CommandType.StoredProcedure
                );

                var purchaseOrder = await multi.ReadSingleOrDefaultAsync<PurchaseOrderDetailDto>();
                if (purchaseOrder == null)
                    return null;

                purchaseOrder.Items = (await multi.ReadAsync<PurchaseOrderItemDto>()).AsList();

                return purchaseOrder;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating purchase order");
                throw;
            }
        }

        public async Task<PurchaseOrderDetailDto> UpdatePurchaseOrderStatusAsync(int poId, string status)
        {
            try
            {
                using var connection = _connectionFactory.CreateConnection();
                
                using var multi = await connection.QueryMultipleAsync(
                    "spPurchaseOrders_UpdateStatus",
                    new { POId = poId, Status = status },
                    commandType: CommandType.StoredProcedure
                );

                var purchaseOrder = await multi.ReadSingleOrDefaultAsync<PurchaseOrderDetailDto>();
                if (purchaseOrder == null)
                    return null;

                purchaseOrder.Items = (await multi.ReadAsync<PurchaseOrderItemDto>()).AsList();

                return purchaseOrder;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating purchase order status for PO {POId}", poId);
                throw;
            }
        }

        public async Task<PurchaseOrderDetailDto> ReceivePurchaseOrderAsync(int poId, ReceivePurchaseOrderRequestDto request, int receivedBy)
        {
            try
            {
                // Convert received items to JSON for stored procedure
                var receivedItemsJson = JsonSerializer.Serialize(request.ReceivedItems);

                using var connection = _connectionFactory.CreateConnection();
                
                using var multi = await connection.QueryMultipleAsync(
                    "spPurchaseOrders_Receive",
                    new
                    {
                        POId = poId,
                        ReceivedBy = receivedBy,
                        ReceivedItemsJson = receivedItemsJson
                    },
                    commandType: CommandType.StoredProcedure
                );

                var purchaseOrder = await multi.ReadSingleOrDefaultAsync<PurchaseOrderDetailDto>();
                if (purchaseOrder == null)
                    return null;

                purchaseOrder.Items = (await multi.ReadAsync<PurchaseOrderItemDto>()).AsList();

                return purchaseOrder;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error receiving purchase order {POId}", poId);
                throw;
            }
        }

        public async Task<List<PurchaseOrderItemDto>> GetPurchaseOrderItemsAsync(int poId)
        {
            try
            {
                using var connection = _connectionFactory.CreateConnection();
                var items = await connection.QueryAsync<PurchaseOrderItemDto>(
                    "spPurchaseOrderItems_GetByPOId",
                    new { POId = poId },
                    commandType: CommandType.StoredProcedure
                );
                return items.AsList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting purchase order items for PO {POId}", poId);
                throw;
            }
        }
    }
}