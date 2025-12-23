USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spAdminOrders_GetById_Header
    @OrderId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP 1
        o.OrderId,
        o.UserId,
        o.OrderDate,
        o.TotalAmount,
        o.Status,
        o.ShippingName,
        o.ShippingAddress,
        o.ShippingCity,
        o.ShippingPhone,
        o.PaymentMethodId,
        o.PaymentStatus,
        o.PaymentGateway,
        o.Notes
    FROM Orders o
    WHERE o.OrderId = @OrderId;
END
GO
