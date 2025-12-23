USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spProfile_ChangePassword
    @UserId INT,
    @PasswordHash VARCHAR(MAX)
AS
BEGIN
    UPDATE Users
    SET PasswordHash = @PasswordHash,
        UpdatedAt = SYSUTCDATETIME()
    WHERE UserId = @UserId AND DeletedAt IS NULL;
END;
