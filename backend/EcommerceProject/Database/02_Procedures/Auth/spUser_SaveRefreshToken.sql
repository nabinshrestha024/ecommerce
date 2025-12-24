USE [EcommerceDB]
GO
CREATE OR ALTER PROCEDURE [dbo].[spUser_SaveRefreshToken]
    @UserId INT,
    @RefreshToken VARCHAR(500),
    @Expiry DATETIME2
AS
BEGIN
    UPDATE Users
    SET 
        RefreshToken = @RefreshToken,
        RefreshTokenExpiry = @Expiry,
        UpdatedAt = SYSUTCDATETIME()
    WHERE UserId = @UserId AND IsActive = 1;
END
