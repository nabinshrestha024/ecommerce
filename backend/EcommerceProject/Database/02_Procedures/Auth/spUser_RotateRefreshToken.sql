USE [EcommerceDB];
GO
CREATE OR ALTER PROCEDURE spUser_RotateRefreshToken
    @OldRefreshToken VARCHAR(500),
    @NewRefreshToken VARCHAR(500)
AS
BEGIN
    UPDATE Users
    SET 
        RefreshToken = @NewRefreshToken,
        UpdatedAt = SYSUTCDATETIME()
    WHERE RefreshToken = @OldRefreshToken;
END
GO