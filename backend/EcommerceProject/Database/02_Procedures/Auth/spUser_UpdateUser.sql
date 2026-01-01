USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE [dbo].[spUser_UpdateUser]
    @UserId INT,
    @FullName NVARCHAR(255) = NULL,
    @Role BIT = NULL,
    @Phone NVARCHAR(20) = NULL,
    @Address NVARCHAR(500) = NULL,
    @City NVARCHAR(100) = NULL,
    @ProfileImageUrl NVARCHAR(MAX) = NULL,
    @IsActive BIT = NULL
    AS
    
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Users 
    SET 
        FullName = ISNULL(@FullName, FullName),
        Phone = ISNULL(@Phone, Phone),
        Address = ISNULL(@Address, Address),
        Role = ISNULL(@Role, Role),
        City = ISNULL(@City, City),
        ProfileImageUrl = ISNULL(@ProfileImageUrl, ProfileImageUrl),
        IsActive = IsNull(@IsActive, IsActive),
        UpdatedAt = GETDATE()
    WHERE UserId = @UserId;
    Select @@ROWCOUNT AS RowsAffected;
END
