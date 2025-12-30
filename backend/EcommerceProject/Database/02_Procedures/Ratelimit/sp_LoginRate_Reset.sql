CREATE OR ALTER PROCEDURE sp_LoginRate_Reset
    @Email VARCHAR(200),
    @IpAddress VARCHAR(50)
AS
BEGIN
    DELETE FROM LoginRateLimits
    WHERE Email = @Email AND IpAddress = @IpAddress;
END;
GO
