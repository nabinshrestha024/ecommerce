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


    IF @FromDate IS NULL SET @FromDate = '2025-01-01';
    IF @ToDate   IS NULL SET @ToDate   = DATEADD(DAY, 1, @Today);

      SELECT
        d.[Date],
        ISNULL(SUM(o.TotalAmount), 0) AS TotalSales,
        COUNT(o.OrderId) AS TotalOrders
    FROM
    (
        SELECT DATEADD(DAY, n.number, CAST(@FromDate AS DATE)) AS [Date]
        FROM master.dbo.spt_values n
        WHERE n.type = 'P'
          AND n.number <= DATEDIFF(DAY, @FromDate, @ToDate)
    ) d
    LEFT JOIN Orders o
        ON CAST(o.OrderDate AS DATE) = d.[Date]
    GROUP BY d.[Date]
    ORDER BY d.[Date];
END
