USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE sp_LoginRate_CheckAndFail
    @Email VARCHAR(200),
    @IpAddress VARCHAR(50),
    @MaxAttempts INT = 5,
    @LockMinutes INT = 15
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Now DATETIME2 = SYSUTCDATETIME();

    IF EXISTS (
        SELECT 1 FROM LoginRateLimits
        WHERE Email = @Email
          AND IpAddress = @IpAddress
          AND LockedUntilUtc IS NOT NULL
          AND LockedUntilUtc > @Now
    )
    BEGIN
        SELECT 1 AS IsLocked;
        RETURN;
    END

    MERGE LoginRateLimits AS t
    USING (SELECT @Email Email, @IpAddress Ip) AS s
    ON t.Email = s.Email AND t.IpAddress = s.Ip
    WHEN MATCHED THEN
        UPDATE SET
            FailedAttempts = FailedAttempts + 1,
            LastAttemptUtc = @Now,
            LockedUntilUtc =
                CASE
                    WHEN FailedAttempts + 1 >= @MaxAttempts
                    THEN DATEADD(MINUTE, @LockMinutes, @Now)
                    ELSE NULL
                END
    WHEN NOT MATCHED THEN
        INSERT (Email, IpAddress, FailedAttempts, LastAttemptUtc)
        VALUES (@Email, @IpAddress, 1, @Now);

    SELECT 0 AS IsLocked;
END;
GO
