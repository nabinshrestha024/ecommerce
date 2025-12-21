USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spProfile_PutUpdate
    @UserId INT,
    @FullName VARCHAR(100),
    @Phone VARCHAR(20),
    @Address VARCHAR(500),
    @City VARCHAR(100),
    @ProfileImageUrl VARCHAR(1024),
    @Status SMALLINT,
    @DateOfBirth DATE,
    @Gender VARCHAR(20),
    @Bio VARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Users
    SET
        FullName = @FullName,
        Phone = @Phone,
        Address = @Address,
        City = @City,
        ProfileImageUrl = @ProfileImageUrl,
        Status = @Status,
        UpdatedAt = SYSUTCDATETIME()
    WHERE UserId = @UserId AND DeletedAt IS NULL;

    MERGE UserProfiles AS t
    USING (SELECT @UserId AS UserId) s
    ON t.UserId = s.UserId
    WHEN MATCHED THEN
        UPDATE SET
            DateOfBirth = @DateOfBirth,
            Gender = @Gender,
            Bio = @Bio
    WHEN NOT MATCHED THEN
        INSERT (UserId, DateOfBirth, Gender, Bio)
        VALUES (@UserId, @DateOfBirth, @Gender, @Bio);
END;
