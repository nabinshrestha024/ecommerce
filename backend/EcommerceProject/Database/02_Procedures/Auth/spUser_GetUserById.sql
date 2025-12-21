USE [EcommerceDB]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE spUser_GetUserById
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        UserId, Email, PasswordHash, FullName, Status, 
        ProfileImageUrl, Phone, Address, City, Role, 
        IsActive, CreatedAt, UpdatedAt, DeletedAt
    FROM Users 
    WHERE UserId = @UserId AND DeletedAt IS NULL;
END
