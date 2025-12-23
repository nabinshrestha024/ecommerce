USE [EcommerceDB]
GO

CREATE OR ALTER PROCEDURE [dbo].[spUser_Logout]
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE UserRefreshTokens
    SET IsRevoked = 1
    WHERE UserId = @UserId;

END;
