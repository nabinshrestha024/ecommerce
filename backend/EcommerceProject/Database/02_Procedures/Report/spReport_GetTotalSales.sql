USE EcommerceDB;
GO


CREATE OR ALTER PROCEDURE dbo.spReport_GetTotalSales
(
    @FromDate DATETIME = NULL,
    @ToDate   DATETIME = NULL,
    @Period   VARCHAR(20) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Today DATE = CAST(GETDATE() AS DATE);

    IF @Period IS NOT NULL
    BEGIN
        IF @Period = 'day'
        BEGIN
            SET @FromDate = @Today;
            SET @ToDate   = DATEADD(DAY, 1, @Today);
        END
        ELSE IF @Period = 'lastweek'
        BEGIN
            SET @FromDate = DATEADD(DAY, -6, @Today);
            SET @ToDate   = DATEADD(DAY, 1, @Today);
        END
        ELSE IF @Period = 'lastmonth'
        BEGIN
            SET @FromDate = DATEADD(DAY, -29, @Today); 
            SET @ToDate   = DATEADD(DAY, 1, @Today);
        END
    END


    IF @FromDate IS NULL SET @FromDate = '2020-01-01';
    IF @ToDate   IS NULL SET @ToDate   = DATEADD(DAY, 1, @Today);

    ;WITH DateRange AS
    (
        SELECT CAST(@FromDate AS DATE) AS [Date]
        UNION ALL
        SELECT DATEADD(DAY, 1, [Date])
        FROM DateRange
        WHERE [Date] < CAST(DATEADD(DAY, -1, @ToDate) AS DATE)
    )
    SELECT
        d.[Date],
        ISNULL(SUM(o.TotalAmount), 0) AS TotalSales,
        COUNT(o.OrderId) AS TotalOrders
    FROM DateRange d
    LEFT JOIN Orders o
        ON CAST(o.OrderDate AS DATE) = d.[Date]
    GROUP BY d.[Date]
    ORDER BY d.[Date]
    OPTION (MAXRECURSION 1000);
END
