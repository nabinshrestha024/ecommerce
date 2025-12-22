USE [EcommerceDB]
GO
/****** Object:  StoredProcedure [dbo].[spUSer_GetAllUsers]    Script Date: 12/19/2025 10:47:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE [dbo].[spUSer_GetAllUsers]
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
