USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spProfile_UpdateImage
    @UserId INT,
    @ProfileImageUrl VARCHAR(1024)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Users
    SET
        ProfileImageUrl = @ProfileImageUrl,
        UpdatedAt = SYSUTCDATETIME()
    WHERE UserId = @UserId
      AND DeletedAt IS NULL;
END;
GO
