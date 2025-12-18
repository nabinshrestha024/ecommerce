USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spPurchaseOrders_GetById
    @POId INT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        po.POID AS POId,
        po.VendorID AS VendorId,
        v.Name AS VendorName,
        v.ContactPerson AS VendorContact,
        po.OrderDate,
        po.Status,
        po.TotalAmount,
        po.Notes,
        po.CreatedBy,
        u.FullName AS CreatedByName
    FROM PurchaseOrders po
    LEFT JOIN Vendors v ON po.VendorID = v.VendorID
    LEFT JOIN Users u ON po.CreatedBy = u.UserID
    WHERE po.POID = @POId;
    
    SELECT 
        poi.POItemID AS POItemId,
        poi.POID AS POId,
        poi.ProductID AS ProductId,
        p.Name AS ProductName,
        p.SKU,
        poi.Quantity,
        poi.UnitCost,
        (poi.Quantity * poi.UnitCost) AS ItemTotal
    FROM PurchaseOrderItems poi
    INNER JOIN Products p ON poi.ProductID = p.ProductID
    WHERE poi.POID = @POId;
END
GO

PRINT 'Procedure spPurchaseOrders_GetById created successfully.';
GO