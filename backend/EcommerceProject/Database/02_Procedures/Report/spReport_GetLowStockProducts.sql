USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spReport_GetLowStockProducts
    @Threshold INT
AS
BEGIN
    SELECT 
        ProductId,
        Name,
        StockQuantity
    FROM Products
    WHERE StockQuantity <= @Threshold
    ORDER BY StockQuantity ASC
END
GO