USE EcommerceDB;
Go

CREATE OR ALTER PROCEDURE spReport_GetTotalSales
    @FromDate DATE,
    @ToDate DATE
AS
BEGIN
    SELECT 
        SUM(TotalAmount) AS TotalSales,
        COUNT(*) AS TotalOrders
    FROM Orders
    WHERE OrderDate BETWEEN @FromDate AND @ToDate
END
GO