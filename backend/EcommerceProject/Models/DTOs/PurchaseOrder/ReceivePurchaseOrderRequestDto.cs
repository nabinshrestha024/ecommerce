namespace EcommerceProject.Models.DTOs.PurchaseOrder
{
      public class ReceivePurchaseOrderRequestDto
    {
        public List<ReceivedItemRequestDto> ReceivedItems { get; set; } = new();
    }  
}
