USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spAdminOrders_GetById_Items
    @OrderId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        oi.OrderItemId,
        oi.ProductId,
        p.Name AS ProductName,
        oi.Quantity,
        oi.UnitPrice,
        CAST(oi.Quantity * oi.UnitPrice AS DECIMAL(10,2)) AS LineTotal
    FROM OrderItems oi
    INNER JOIN Products p ON p.ProductId = oi.ProductId
    WHERE oi.OrderId = @OrderId
    ORDER BY oi.OrderItemId;
END
GO
