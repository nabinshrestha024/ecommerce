USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spProfile_GetOrders
    @UserId INT
AS
BEGIN
    SELECT OrderId, OrderDate, TotalAmount, Status, PaymentStatus
    FROM Orders
    WHERE UserId = @UserId
    ORDER BY OrderDate DESC;
END;
GO