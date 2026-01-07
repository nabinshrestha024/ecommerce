namespace EcommerceProject.Models.DTOs.ShoppingCart
{
    public class CheckoutsRequestDto
    {
        public List<int> SelectedCartItemIds { get; set; } = new();

        public string ShippingName { get; set; } = string.Empty;
        public string ShippingAddress { get; set; } = string.Empty;
        public string ShippingCity { get; set; } = string.Empty;
        public string ShippingPhone { get; set; } = string.Empty;
    }
}
