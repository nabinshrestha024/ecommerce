USE [EcommerceDB]
GO

CREATE OR ALTER   PROCEDURE spReport_GetTopProducts
    @FromDate DATETIME = NULL,
    @ToDate DATETIME = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT p.ProductId,
           p.Name,
           SUM(oi.Quantity) AS QuantitySold,
           SUM(oi.Quantity * oi.UnitPrice) AS TotalRevenue
    FROM OrderItems oi
    INNER JOIN Products p ON p.ProductId = oi.ProductId
    INNER JOIN Orders o ON o.OrderId = oi.OrderId
    WHERE (@FromDate IS NULL OR o.OrderDate >= @FromDate)
      AND (@ToDate IS NULL OR o.OrderDate <= @ToDate)
    GROUP BY p.ProductId, p.Name
    ORDER BY QuantitySold ASC;
END
GO
