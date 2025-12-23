USE EcommerceDB;
GO
CREATE OR ALTER PROCEDURE spOrders_GetByIdForUser_Header
    @UserId INT,
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
    WHERE o.OrderId = @OrderId AND o.UserId = @UserId;
END
GO
