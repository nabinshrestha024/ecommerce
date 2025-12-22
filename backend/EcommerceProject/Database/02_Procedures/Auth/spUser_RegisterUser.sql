USE [EcommerceDB]
GO
/****** Object:  StoredProcedure [dbo].[spUser_RegisterUser]    Script Date: 12/19/2025 10:50:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROCEDURE [dbo].[spUser_RegisterUser]
    @Email NVARCHAR(255),
    @PasswordHash NVARCHAR(MAX),
    @FullName NVARCHAR(255),
    @Phone NVARCHAR(20) = NULL,
    @Address NVARCHAR(500) = NULL,
    @City NVARCHAR(100) = NULL,
    @Role BIT = 0,
    @UserId INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    
    IF EXISTS (SELECT 1 FROM Users WHERE Email = @Email AND DeletedAt IS NULL)
    BEGIN
        THROW 50001, 'Email already exists', 1;
        RETURN;
    END
    
    INSERT INTO Users (Email, PasswordHash, FullName, Phone, Address, City, Role, IsActive, CreatedAt)
    VALUES (@Email, @PasswordHash, @FullName, @Phone, @Address, @City, @Role, 1, GETDATE());
    
    SET @UserId = SCOPE_IDENTITY();
END
