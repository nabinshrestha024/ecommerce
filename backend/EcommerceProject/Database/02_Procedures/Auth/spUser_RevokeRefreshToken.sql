USE [EcommerceDB]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
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
