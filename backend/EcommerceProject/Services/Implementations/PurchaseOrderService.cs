using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EcommerceProject.Models.DTOs.PurchaseOrder;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using Microsoft.Extensions.Logging;

namespace EcommerceProject.Services.Implementations
{
    public class PurchaseOrderService : IPurchaseOrderService
    {
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;
        private readonly ILogger<PurchaseOrderService> _logger;

        public PurchaseOrderService(IPurchaseOrderRepository purchaseOrderRepository, ILogger<PurchaseOrderService> logger)
        {
            _purchaseOrderRepository = purchaseOrderRepository;
            _logger = logger;
        }

        public async Task<PurchaseOrderDetailDto> GetPurchaseOrderByIdAsync(int poId)
        {
            try
            {
                _logger.LogInformation("Getting purchase order by ID: {POId}", poId);
                return await _purchaseOrderRepository.GetPurchaseOrderByIdAsync(poId);
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
                _logger.LogInformation("Getting purchase orders - Page: {PageNumber}, Size: {PageSize}, Status: {Status}", 
                    pageNumber, pageSize, status);
                
                if (pageNumber < 1) pageNumber = 1;
                if (pageSize < 1 || pageSize > 100) pageSize = 10;
                
                return await _purchaseOrderRepository.GetAllPurchaseOrdersAsync(pageNumber, pageSize, status);
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
                _logger.LogInformation("Creating purchase order for vendor: {VendorId}", request.VendorId);
                
                if (request.Items == null || request.Items.Count == 0)
                {
                    throw new ArgumentException("At least one item is required for purchase order");
                }
                
                var po = await _purchaseOrderRepository.CreatePurchaseOrderAsync(request, createdBy);
                _logger.LogInformation("Purchase order created successfully with ID: {POId}", po.POId);
                return po;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating purchase order");
                throw;
            }
        }

        public async Task<PurchaseOrderDetailDto> UpdatePurchaseOrderStatusAsync(int poId, string status, int updatedBy)
        {
            try
            {
                _logger.LogInformation("Updating purchase order status: PO={POId}, Status={Status}", poId, status);
                
                var validStatuses = new List<string> { "Pending", "Approved", "Cancelled", "Received" };
                if (!validStatuses.Contains(status))
                {
                    throw new ArgumentException($"Invalid status. Valid statuses are: {string.Join(", ", validStatuses)}");
                }
                
                var po = await _purchaseOrderRepository.UpdatePurchaseOrderStatusAsync(poId, status);
                _logger.LogInformation("Purchase order status updated successfully: PO={POId}", poId);
                return po;
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
                _logger.LogInformation("Receiving purchase order: PO={POId}", poId);
                
                if (request.ReceivedItems == null || request.ReceivedItems.Count == 0)
                {
                    throw new ArgumentException("At least one received item is required");
                }
                
                var po = await _purchaseOrderRepository.ReceivePurchaseOrderAsync(poId, request, receivedBy);
                _logger.LogInformation("Purchase order received successfully: PO={POId}", poId);
                return po;
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
                _logger.LogInformation("Getting purchase order items for PO: {POId}", poId);
                return await _purchaseOrderRepository.GetPurchaseOrderItemsAsync(poId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting purchase order items for PO {POId}", poId);
                throw;
            }
        }
    }
}