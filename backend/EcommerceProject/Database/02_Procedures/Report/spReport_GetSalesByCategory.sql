USE EcommerceDB;
Go

CREATE OR ALTER PROCEDURE spReport_GetSalesByCategory
    @FromDate DATE,
    @ToDate DATE
AS
BEGIN
    SELECT 
        p.CategoryId,
        c.Name,
        SUM(od.Quantity * od.UnitPrice) AS TotalSales
    FROM OrderItems od
    INNER JOIN Orders o ON o.OrderId = od.OrderId
    INNER JOIN Products p ON p.ProductId = od.ProductId
    INNER JOIN Categories c ON c.CategoryId = p.CategoryId
    WHERE o.OrderDate BETWEEN @FromDate AND @ToDate
    GROUP BY p.CategoryId, c.Name
END
GO