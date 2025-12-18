USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spStock_GetAll
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        p.ProductID AS ProductId,
        p.Name AS ProductName,
        p.SKU,
        p.StockQuantity AS CurrentStock,
        10 AS ReorderLevel, -- Default reorder level
        p.Price,
        c.Name AS CategoryName,
        p.UpdatedAt AS LastUpdated,
        CASE 
            WHEN p.StockQuantity <= 10 THEN 'Low Stock'
            WHEN p.StockQuantity = 0 THEN 'Out of Stock'
            ELSE 'In Stock'
        END AS Status
    FROM Products p
    LEFT JOIN Categories c ON p.CategoryID = c.CategoryID
    WHERE p.IsActive = 1
    ORDER BY p.Name;
END
GO

PRINT 'Procedure spStock_GetAll created successfully.';
GO