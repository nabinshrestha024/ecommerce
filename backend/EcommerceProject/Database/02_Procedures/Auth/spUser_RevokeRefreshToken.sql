USE [EcommerceDB]
GO


CREATE OR ALTER PROCEDURE [dbo].[spUser_RevokeRefreshToken]
    @UserId INT
AS
BEGIN
    UPDATE Users
    SET 
        RefreshToken = NULL,
        UpdatedAt = SYSUTCDATETIME()
    WHERE UserId = @UserId;
END
