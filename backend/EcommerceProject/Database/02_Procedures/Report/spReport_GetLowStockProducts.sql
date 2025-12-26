USE [EcommerceDB]
GO

CREATE OR ALTER   PROCEDURE spReport_GetLowStockProducts
    @FromDate DATETIME = NULL,
    @ToDate DATETIME = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT ProductId,
           Name,
           StockQuantity,
           UpdatedAt
    FROM Products
    WHERE StockQuantity <= 10
      AND (@FromDate IS NULL OR UpdatedAt >= @FromDate)
      AND (@ToDate IS NULL OR UpdatedAt <= @ToDate)
    ORDER BY StockQuantity ASC;
END
GO
