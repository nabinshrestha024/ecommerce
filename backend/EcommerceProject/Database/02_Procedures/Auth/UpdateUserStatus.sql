USE [EcommerceDB]
GO
/****** Object:  StoredProcedure [dbo].[UpdateUserStatus]    Script Date: 12/19/2025 10:52:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Stored Procedure: UpdateUserStatus (Block/Unblock)
CREATE OR ALTER PROCEDURE [dbo].[UpdateUserStatus]
    @UserId INT,
    @IsActive BIT
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Users 
    SET 
        IsActive = @IsActive,
        UpdatedAt = GETDATE()
    WHERE UserId = @UserId AND DeletedAt IS NULL;
END
