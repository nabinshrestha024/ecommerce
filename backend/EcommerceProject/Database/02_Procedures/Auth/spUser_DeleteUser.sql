USE [EcommerceDB];
GO
CREATE OR ALTER PROCEDURE spUser_DeleteUser
    @UserId INT
AS
BEGIN
    UPDATE Users
    SET 
        DeletedAt = GETUTCDATE(),
        IsActive = 0
    WHERE UserId = @UserId;
END