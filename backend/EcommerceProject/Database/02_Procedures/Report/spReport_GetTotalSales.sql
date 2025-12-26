USE [EcommerceDB]
GO

CREATE OR ALTER   PROCEDURE spReport_GetTotalSales
    @FromDate DATETIME = NULL,
    @ToDate DATETIME = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT CAST(OrderDate AS DATE) AS Date,
           SUM(TotalAmount) AS TotalSales,
           COUNT(OrderId) AS TotalOrders
    FROM Orders
    WHERE (@FromDate IS NULL OR OrderDate >= @FromDate)
      AND (@ToDate IS NULL OR OrderDate <= @ToDate)
    GROUP BY CAST(OrderDate AS DATE)
    ORDER BY Date;
END
GO
