USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spStock_GetLowStock
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        p.ProductID AS ProductId,
        p.Name AS ProductName,
        p.SKU,
        p.StockQuantity AS CurrentStock,
        10 AS ReorderLevel,
        c.Name AS CategoryName,
        (SELECT MAX(o.OrderDate) 
         FROM OrderItems oi 
         INNER JOIN Orders o ON oi.OrderID = o.OrderID 
         WHERE oi.ProductID = p.ProductID) AS LastSoldDate
    FROM Products p
    LEFT JOIN Categories c ON p.CategoryID = c.CategoryID
    WHERE p.IsActive = 1 
        AND p.StockQuantity <= 10
    ORDER BY p.StockQuantity ASC, p.Name;
END
GO

PRINT 'Procedure spStock_GetLowStock created successfully.';
GO