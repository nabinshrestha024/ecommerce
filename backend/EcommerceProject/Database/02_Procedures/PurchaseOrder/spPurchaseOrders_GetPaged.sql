USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spPurchaseOrders_GetPaged
    @PageNumber INT = 1,
    @PageSize INT = 10,
    @Status VARCHAR(20) = NULL,
    @VendorId INT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;
    
    SELECT COUNT(*) AS TotalCount
    FROM PurchaseOrders po
    WHERE (@Status IS NULL OR po.Status = @Status)
        AND (@VendorId IS NULL OR po.VendorId = @VendorId);
    
    SELECT 
        po.POId,
        po.VendorId,
        v.Name AS VendorName,
        po.OrderDate,
        po.Status,
        po.TotalAmount,
        po.Notes,
        po.CreatedBy,
        u.FullName AS CreatedByName,
        (SELECT COUNT(*) FROM PurchaseOrderItems poi WHERE poi.POID = po.POID) AS ItemCount
    FROM PurchaseOrders po
    LEFT JOIN Vendors v ON po.VendorId = v.VendorId
    LEFT JOIN Users u ON po.CreatedBy = u.UserId
    WHERE (@Status IS NULL OR po.Status = @Status)
        AND (@VendorId IS NULL OR po.VendorId = @VendorId)
    ORDER BY po.OrderDate DESC
    OFFSET @Offset ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END
GO

PRINT 'Procedure spPurchaseOrders_GetPaged created successfully.';
GO