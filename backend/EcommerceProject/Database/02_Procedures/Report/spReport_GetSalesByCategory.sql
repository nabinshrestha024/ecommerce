USE [EcommerceDB]
GO

CREATE OR ALTER   PROCEDURE spReport_GetSalesByCategory
    @FromDate DATETIME = NULL,
    @ToDate DATETIME = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT c.Name AS CategoryName,
           SUM(oi.Quantity) AS QuantitySold,
           SUM(oi.Quantity * oi.UnitPrice) AS TotalRevenue
    FROM OrderItems oi
    INNER JOIN Products p ON p.ProductId = oi.ProductId
    INNER JOIN Categories c ON c.CategoryId = p.CategoryId
    INNER JOIN Orders o ON o.OrderId = oi.OrderId
    WHERE (@FromDate IS NULL OR o.OrderDate >= @FromDate)
      AND (@ToDate IS NULL OR o.OrderDate <= @ToDate)
    GROUP BY c.Name
    ORDER BY TotalRevenue ASC;
END
GO
