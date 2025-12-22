namespace EcommerceProject.Models.DTOs.Payment
{
public class CheckoutRequestDto
{
    public string? ShippingName { get; set; }
    public string? ShippingAddress { get; set; }
    public string? ShippingCity { get; set; }
    public string? ShippingPhone { get; set; }
    public string? PaymentMethod { get; set; }
}
}