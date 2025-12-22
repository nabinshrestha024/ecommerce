USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spOrders_GetDetailsByUserIdAndOrderId
    @OrderId INT,
    @UserId INT
AS
BEGIN
    SELECT *
    FROM Orders
    WHERE OrderId = @OrderId AND UserId = @UserId;

    SELECT *
    FROM OrderItems
    WHERE OrderId = @OrderId;
END;
GO
