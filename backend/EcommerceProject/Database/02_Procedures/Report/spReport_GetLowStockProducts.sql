USE [EcommerceDB]
GO


CREATE OR ALTER PROCEDURE spReport_GetLowStockProducts
    (
    @FromDate DATETIME = NULL,
    @ToDate DATETIME = NULL,
    @Period VARCHAR(10) = NULL,     --Way| Week | Month
    @sortOrder VARCHAR(20) = 'desc'
    )
AS
BEGIN
    SET NOCOUNT ON;
    IF @Period IS NOT NULL 
    BEGIN 
    IF @Period = 'day'
    BEGIN 
        SET @FromDate =CAST(GETDATE() AS DATE);
        SET @TODate = DATEADD(DAY, 1, @FromDate);
        END
       
        ELSE IF @Period = 'lastweek'
        BEGIN 
            SET @ToDate = GETDATE();
            SET @FromDate = DATEADD(DAY, -7,@ToDate);
            
        END
            
        ELSE IF @Period = 'lastmonth'
        BEGIN 
            SET @ToDate = GETDATE();
            SET @FromDate = DATEADD(MONTH, -1,@ToDate);
            
        END
    END

;WITH DateRange AS
    (
        SELECT CAST(@FromDate AS DATE) AS [Date]
        UNION ALL
        SELECT DATEADD(DAY, 1, [Date])
        FROM DateRange
        WHERE [Date] < DATEADD(DAY, -1, CAST(@ToDate AS DATE))
    )

        SELECT
        d.[Date],
        ISNULL(SUM(o.TotalAmount), 0) AS TotalSales,
        COUNT(o.OrderId) AS TotalOrders
    FROM DateRange d
    LEFT JOIN Orders o
        ON CAST(o.OrderDate AS DATE) = d.[Date]
    GROUP BY d.[Date]
    ORDER BY
    CASE WHEN @sortOrder = 'asc' THEN d.Date END ASC,
    CASE WHEN @sortOrder = 'desc' THEN d.Date END DESC
    OPTION (MAXRECURSION 1000);
END
