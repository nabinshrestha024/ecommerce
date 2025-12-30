CREATE OR ALTER PROCEDURE sp_LoginRate_IsLocked
    @Email VARCHAR(200),
    @IpAddress VARCHAR(50)
AS
BEGIN
    DECLARE @Now DATETIME2 = SYSUTCDATETIME();

    SELECT
        CASE
            WHEN LockedUntilUtc IS NOT NULL AND LockedUntilUtc > @Now
            THEN 1 ELSE 0
        END AS IsLocked
    FROM LoginRateLimits
    WHERE Email = @Email AND IpAddress = @IpAddress;
END;
GO
