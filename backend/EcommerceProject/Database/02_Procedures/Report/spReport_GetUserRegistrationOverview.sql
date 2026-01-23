USE [EcommerceDB]
GO


CREATE OR ALTER   PROCEDURE spReport_GetUserRegistrationOverview
(
    @FromDate DATE = NULL,
    @ToDate   DATE = NULL,
    @Period   VARCHAR(10) = NULL,   -- lastday | lastweek | lastmonth
    @sortOrder VARCHAR(20) = 'Desc'
)
AS
BEGIN
    SET NOCOUNT ON;

    IF @Period IS NOT NULL
    BEGIN
        IF @Period = 'lastday'
        BEGIN
            SET @FromDate = CAST(GETDATE() AS DATE);
            SET @ToDate   = @FromDate;
        END
        ELSE IF @Period = 'lastweek'
        BEGIN
         
            SET @ToDate   = CAST(GETDATE() AS DATE);
            SET @FromDate = DATEADD(DAY, -6, @ToDate);
        END
        ELSE IF @Period = 'lastmonth'
        BEGIN
            SET @ToDate   = CAST(GETDATE() AS DATE);
            SET @FromDate = DATEADD(DAY, -29, @ToDate);
        END
    END

    IF @FromDate IS NULL SET @FromDate = '2020-01-01';
    IF @ToDate   IS NULL SET @ToDate   = CAST(GETDATE() AS DATE);


    ;WITH Numbers AS
    (
        SELECT 0 AS n
        UNION ALL
        SELECT n + 1
        FROM Numbers
        WHERE n < DATEDIFF(DAY, @FromDate, @ToDate)
    ),
    AllDates AS
    (
        SELECT DATEADD(DAY, n, @FromDate) AS [Date]
        FROM Numbers
    ),
    Registrations AS
    (
        SELECT
            CAST(CreatedAt AS DATE) AS [Date],
            COUNT(*) AS TotalRegistrations
        FROM Users
        WHERE CreatedAt >= @FromDate
          AND CreatedAt < DATEADD(DAY, 1, @ToDate)
        GROUP BY CAST(CreatedAt AS DATE)
    )
    SELECT
        ad.[Date],
        ISNULL(r.TotalRegistrations, 0) AS TotalRegistrations
    FROM AllDates ad
    LEFT JOIN Registrations r
        ON ad.[Date] = r.[Date]
    ORDER BY
    CASE WHEN @SortOrder = 'asc'  THEN ad.[Date] END ASC,
        CASE WHEN @SortOrder = 'desc' THEN ad.[Date] END DESC
    OPTION (MAXRECURSION 0);
END
