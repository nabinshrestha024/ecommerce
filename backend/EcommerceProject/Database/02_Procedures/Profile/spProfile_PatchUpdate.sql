USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spProfile_PatchUpdate
    @UserId INT,
    @FullName VARCHAR(100),
    @Phone VARCHAR(20),
    @Address VARCHAR(500),
    @City VARCHAR(100),
    @ProfileImageUrl VARCHAR(1024),
    @Status SMALLINT,
    @DateOfBirth DATE = NULL,
    @Gender VARCHAR(20) = NULL,
    @Bio VARCHAR(500) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Users
    SET
        FullName = COALESCE(@FullName, FullName),
        Phone = COALESCE(@Phone, Phone),
        Address = COALESCE(@Address, Address),
        City = COALESCE(@City, City),
        ProfileImageUrl = COALESCE(@ProfileImageUrl, ProfileImageUrl),
        Status = COALESCE(@Status, Status),
        UpdatedAt = SYSUTCDATETIME()
        WHERE UserId = @UserId
    AND DeletedAt IS NULL;

    IF NOT EXISTS (SELECT 1 FROM UserProfiles WHERE UserId = @UserId)
    BEGIN
        INSERT INTO UserProfiles (UserId, DateOfBirth, Gender, Bio)
        VALUES (@UserId, @DateOfBirth, @Gender, @Bio);
    END
    ELSE
    BEGIN
        UPDATE UserProfiles
        SET
            DateOfBirth = @DateOfBirth,
            Gender = @Gender,
            Bio = @Bio
        WHERE UserId = @UserId;
    END
END;
GO
