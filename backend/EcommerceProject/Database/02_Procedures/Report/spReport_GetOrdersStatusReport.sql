USE EcommerceDB;
GO

CREATE PROCEDURE sp_GetOrdersStatusReport
    @StartDate DATETIME = NULL,
    @EndDate DATETIME = NULL
AS
BEGIN
    SELECT 
        COUNT(OrderId) AS TotalOrders,
        SUM(CASE WHEN Status = 'Pending' THEN 1 ELSE 0 END) AS Pending,
        SUM(CASE WHEN Status = 'Shipped' THEN 1 ELSE 0 END) AS Shipped,
        SUM(CASE WHEN Status = 'Delivered' THEN 1 ELSE 0 END) AS Delivered,
        SUM(CASE WHEN Status = 'Cancelled' THEN 1 ELSE 0 END) AS Cancelled
    FROM Orders
    WHERE (@StartDate IS NULL OR OrderDate >= @StartDate)
      AND (@EndDate IS NULL OR OrderDate <= @EndDate)
END
GO

PRINT 'Stored Procedure sp_GetOrdersStatusReport created successfully.';
