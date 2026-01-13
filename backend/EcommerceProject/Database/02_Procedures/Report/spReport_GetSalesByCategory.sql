USE [EcommerceDB]
GO
/****** Object:  StoredProcedure [dbo].[spReport_GetSalesByCategory]    Script Date: 1/13/2026 10:24:48 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[spReport_GetSalesByCategory]
    @FromDate DATETIME = NULL,
    @ToDate DATETIME = NULL,
    @Period VARCHAR(20) = NULL

AS
BEGIN
    SET NOCOUNT ON;

    IF @Period IS NOT NULL
    BEGIN 
    IF @Period = 'day'
    BEGIN 
    SET @FromDate=CAST(GETDATE() AS DATE);
    SET @ToDate = DATEADD(DAY,1,@FromDate);
    END


   ELSE IF @Period = 'lastweek'
        BEGIN
            SET @ToDate   = GETDATE();
            SET @FromDate = DATEADD(DAY, -7, @ToDate);
        END

        ELSE IF @Period = 'lastmonth'
        BEGIN
        SET @ToDate = GETDATE();
        SET @FromDate = DATEADD(MONTH, -1, @ToDate);
        END
        END

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
