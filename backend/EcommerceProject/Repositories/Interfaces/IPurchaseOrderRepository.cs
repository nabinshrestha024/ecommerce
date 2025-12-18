using System.Collections.Generic;
using System.Threading.Tasks;
using EcommerceProject.Models.DTOs.PurchaseOrder;

namespace EcommerceProject.Repositories.Interfaces
{
    public interface IPurchaseOrderRepository
    {
        Task<PurchaseOrderDetailDto> GetPurchaseOrderByIdAsync(int poId);
        Task<PagedResultDto<PurchaseOrderDto>> GetAllPurchaseOrdersAsync(int pageNumber = 1, int pageSize = 10, string? status = null);
        Task<PurchaseOrderDetailDto> CreatePurchaseOrderAsync(CreatePurchaseOrderRequestDto request, int createdBy);
        Task<PurchaseOrderDetailDto> UpdatePurchaseOrderStatusAsync(int poId, string status);
        Task<PurchaseOrderDetailDto> ReceivePurchaseOrderAsync(int poId, ReceivePurchaseOrderRequestDto request, int receivedBy);
        Task<List<PurchaseOrderItemDto>> GetPurchaseOrderItemsAsync(int poId);
    }
}