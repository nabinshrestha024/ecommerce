using System.Threading.Tasks;
using EcommerceProject.Models.DTOs.PurchaseOrder;

namespace EcommerceProject.Services.Interfaces
{
    public interface IPurchaseOrderService
    {
        Task<PurchaseOrderDetailDto> GetPurchaseOrderByIdAsync(int poId);
        Task<PagedResultDto<PurchaseOrderDto>> GetAllPurchaseOrdersAsync(int pageNumber = 1, int pageSize = 10, string? status = null);
        Task<PurchaseOrderDetailDto> CreatePurchaseOrderAsync(CreatePurchaseOrderRequestDto request, int createdBy);
        Task<PurchaseOrderDetailDto> UpdatePurchaseOrderStatusAsync(int poId, string status, int updatedBy);
        Task<PurchaseOrderDetailDto> ReceivePurchaseOrderAsync(int poId, ReceivePurchaseOrderRequestDto request, int receivedBy);
        Task<List<PurchaseOrderItemDto>> GetPurchaseOrderItemsAsync(int poId);
    }
}