USE EcommerceDB;
GO
CREATE OR ALTER PROCEDURE spOrders_GetMyOrders
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        o.OrderId,
        o.OrderDate,
        o.TotalAmount,
        o.Status,
        o.PaymentStatus,
        o.ShippingCity
    FROM Orders o
    WHERE o.UserId = @UserId
    ORDER BY o.OrderDate DESC;
END
GO
