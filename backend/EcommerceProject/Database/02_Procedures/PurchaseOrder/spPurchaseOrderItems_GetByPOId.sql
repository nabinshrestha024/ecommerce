USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spPurchaseOrderItems_GetByPOId
    @POId INT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        poi.POItemId,
        poi.POId,
        poi.ProductId,
        p.Name AS ProductName,
        p.SKU,
        poi.Quantity,
        poi.UnitCost,
        (poi.Quantity * poi.UnitCost) AS ItemTotal
    FROM PurchaseOrderItems poi
    INNER JOIN Products p ON poi.ProductId = p.ProductId
    WHERE poi.POId = @POId;
END
GO

PRINT 'Procedure spPurchaseOrderItems_GetByPOId created successfully.';
GO