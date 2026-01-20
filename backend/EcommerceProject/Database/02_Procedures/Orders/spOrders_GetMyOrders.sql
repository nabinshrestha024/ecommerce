USE EcommerceDB;

GO

CREATE OR ALTER   PROCEDURE spOrders_GetMyOrders
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        o.OrderId,
        o.UserId,
        u.FullName,
        o.OrderDate,
        o.TotalAmount,
        o.GrandTotal,
        o.Status,
        o.PaymentStatus,
        o.ShippingCity
    FROM Orders o
    INNER JOIN USers u ON o.UserId = u.UserId
    WHERE o.UserId = @UserId
    ORDER BY o.OrderDate DESC;
END
