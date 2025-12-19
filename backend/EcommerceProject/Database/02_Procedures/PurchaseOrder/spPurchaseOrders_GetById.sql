USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spPurchaseOrders_GetById
    @POId INT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        po.POId,
        po.VendorId,
        v.Name AS VendorName,
        v.ContactPerson AS VendorContact,
        po.OrderDate,
        po.Status,
        po.TotalAmount,
        po.Notes,
        po.CreatedBy,
        u.FullName AS CreatedByName
    FROM PurchaseOrders po
    LEFT JOIN Vendors v ON po.VendorId = v.VendorId
    LEFT JOIN Users u ON po.CreatedBy = u.UserId
    WHERE po.POId = @POId;
    
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

PRINT 'Procedure spPurchaseOrders_GetById created successfully.';
GO