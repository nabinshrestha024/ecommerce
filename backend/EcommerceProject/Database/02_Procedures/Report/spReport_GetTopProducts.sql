USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spReport_GetTopProducts
    @FromDate DATE,
    @ToDate DATE,
    @TopN INT
AS
BEGIN
    SELECT TOP(@TopN)
        p.ProductId,
        p.Name,
        SUM(od.Quantity) AS QuantitySold,
        SUM(od.Quantity * od.UnitPrice) AS TotalSales
    FROM OrderItems od
    INNER JOIN Orders o ON o.OrderId = od.OrderId
    INNER JOIN Products p ON p.ProductId = od.ProductId
    WHERE o.OrderDate BETWEEN @FromDate AND @ToDate
    GROUP BY p.ProductId, p.Name
    ORDER BY QuantitySold DESC
END
GO