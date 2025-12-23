USE [EcommerceDB]
GO

CREATE OR ALTER PROCEDURE UpdateUserStatus
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
