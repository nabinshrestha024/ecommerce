USE [EcommerceDB];
GO

IF OBJECT_ID('catalog.Inventory_GetLowStock', 'P') IS NOT NULL
    DROP PROCEDURE catalog.Inventory_GetLowStock;
GO

CREATE OR ALTER PROCEDURE catalog.Inventory_GetLowStock
AS
BEGIN
    SELECT 
        i.InventoryId,
        i.ProductId,
        p.Name AS ProductName,
        i.QuantityOnHand,
        i.ReorderLevel
    FROM catalog.Inventory i
    JOIN catalog.Products p ON p.ProductId = i.ProductId
    WHERE i.QuantityOnHand <= ReorderLevel;
END
GO

PRINT 'Procedure catalog.Inventory_GetLowStock created or altered successfully.';
GO
