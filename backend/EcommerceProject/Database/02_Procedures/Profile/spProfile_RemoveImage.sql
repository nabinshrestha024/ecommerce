USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spProfile_RemoveImage
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Users
    SET
        ProfileImageUrl = NULL,
        UpdatedAt = SYSUTCDATETIME()
    WHERE UserId = @UserId
      AND DeletedAt IS NULL;
END;
GO
