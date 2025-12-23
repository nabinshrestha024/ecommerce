USE [EcommerceDB]
GO

CREATE OR ALTER PROCEDURE spUSer_GetAllUsers
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        UserId, Email, FullName, Status, 
        ProfileImageUrl, Phone, Address, City, Role, 
        IsActive, CreatedAt, UpdatedAt
    FROM Users 
    WHERE DeletedAt IS NULL
    ORDER BY CreatedAt DESC;
END
