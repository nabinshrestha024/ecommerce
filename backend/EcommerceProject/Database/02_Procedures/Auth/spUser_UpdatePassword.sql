USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spUser_UpdatePassword
    @UserId INT,
    @PasswordHash NVARCHAR(255)
AS
BEGIN
    UPDATE Users
    SET PasswordHash = @PasswordHash
    WHERE UserId = @UserId
END
