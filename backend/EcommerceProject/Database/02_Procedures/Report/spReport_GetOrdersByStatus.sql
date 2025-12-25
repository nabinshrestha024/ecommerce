USE EcommerceDB;
Go

CREATE OR ALTER PROCEDURE spReport_GetOrdersByStatus
    @FromDate DATE,
    @ToDate DATE
AS
BEGIN
    SELECT 
        Status,
        COUNT(*) AS OrderCount
    FROM Orders
    WHERE OrderDate BETWEEN @FromDate AND @ToDate
    GROUP BY Status
END
GO