USE [EcommerceDB]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE spUser_UpdateUser
    @UserId INT,
    @FullName NVARCHAR(255) = NULL,
    @PasswordHash VARCHAR(100),

    @Phone NVARCHAR(20) = NULL,
    @Address NVARCHAR(500) = NULL,
    @City NVARCHAR(100) = NULL,
    @ProfileImageUrl NVARCHAR(MAX) = NULL
    AS
    
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Users 
    SET 
        FullName = ISNULL(@FullName, FullName),
        Phone = ISNULL(@Phone, Phone),
        PasswordHash = ISNULL(@PasswordHash, PasswordHash),
        Address = ISNULL(@Address, Address),
        City = ISNULL(@City, City),
        ProfileImageUrl = ISNULL(@ProfileImageUrl, ProfileImageUrl),
        UpdatedAt = GETDATE()
    WHERE UserId = @UserId;
    Select @@ROWCOUNT AS RowsAffected;
END
