USE [EcommerceDB]
GO
/****** Object:  StoredProcedure [dbo].[spUser_GetUserByEmail]    Script Date: 12/19/2025 10:48:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROCEDURE [dbo].[spUser_GetUserByEmail]
    @Email NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        UserId, Email, PasswordHash, FullName, Status, 
        ProfileImageUrl, Phone, Address, City, Role, 
        IsActive, CreatedAt, UpdatedAt, DeletedAt
    FROM Users 
    WHERE Email = @Email AND DeletedAt IS NULL;
END
