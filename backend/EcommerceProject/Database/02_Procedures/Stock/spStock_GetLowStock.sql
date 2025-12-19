USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spStock_GetLowStock
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        p.ProductId,
        p.Name AS ProductName,
        p.SKU,
        p.StockQuantity AS CurrentStock,
        10 AS ReorderLevel,
        c.Name AS CategoryName,
        (SELECT MAX(o.OrderDate) 
         FROM OrderItems oi 
         INNER JOIN Orders o ON oi.OrderId = o.OrderId 
         WHERE oi.ProductId = p.ProductId) AS LastSoldDate
    FROM Products p
    LEFT JOIN Categories c ON p.CategoryId = c.CategoryId
    WHERE p.IsActive = 1 
        AND p.StockQuantity <= 10
    ORDER BY p.StockQuantity ASC, p.Name;
END
GO

PRINT 'Procedure spStock_GetLowStock created successfully.';
GO