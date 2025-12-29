USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spOrders_GetByIdForUser_Items
    @UserId INT,
    @OrderId INT
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT 1 FROM Orders WHERE OrderId = @OrderId AND UserId = @UserId)
        RETURN;

    SELECT
        oi.OrderItemId,
        oi.ProductId,
        p.Name AS ProductName,
        pi.ImageUrl AS ProductImageUrl,
        p.Description AS ProductDescription,
        oi.Quantity,
        oi.UnitPrice,
        CAST(oi.Quantity * oi.UnitPrice AS DECIMAL(10,2)) AS LineTotal
    FROM OrderItems oi
    LEFT JOIN ProductImages pi
    ON pi.ProductId = oi.ProductId
    AND pi.IsPrimary = 1
    INNER JOIN Products p ON p.ProductId = oi.ProductId
    WHERE oi.OrderId = @OrderId
    ORDER BY oi.OrderItemId;
END
GO
