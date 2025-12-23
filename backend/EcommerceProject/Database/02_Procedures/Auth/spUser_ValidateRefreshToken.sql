USE [EcommerceDB]
GO

 CREATE OR ALTER PROCEDURE spUser_ValidateRefreshToken
    @RefreshToken VARCHAR(500)
AS
BEGIN
    SELECT 
        UserId,
        Email,
        FullName,
        Role
    FROM Users
    WHERE 
        RefreshToken = @RefreshToken
        AND IsActive = 1;
END
GO