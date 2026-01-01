USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spProfile_PutUpdate
    @UserId             INT,
    @FullName           VARCHAR(100),
    --@Phone              VARCHAR(20),    -- remove it
    @Address            VARCHAR(500),
    @City               VARCHAR(100),
    @ProfileImageUrl    VARCHAR(1024),
    --@DateOfBirth        DATE,           -- remove it   
    --@Gender             VARCHAR(20),    -- remove it
    @Bio                VARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Users
    SET
        FullName = @FullName,
        --Phone = @Phone, -- remove it
        Address = @Address,
        City = @City,
        ProfileImageUrl = @ProfileImageUrl,
        UpdatedAt = SYSUTCDATETIME()
    WHERE UserId = @UserId AND DeletedAt IS NULL;

    MERGE UserProfiles AS t
    USING (SELECT @UserId AS UserId) s
    ON t.UserId = s.UserId
    WHEN MATCHED THEN
        UPDATE SET
            --DateOfBirth = @DateOfBirth,     -- remove it
            --Gender = @Gender,               -- remove it
            Bio = @Bio
    WHEN NOT MATCHED THEN
        INSERT (UserId, Bio)        --(UserId, DateOfBirth, Gender, Bio) 
        VALUES  (@UserId, @Bio);    --(@UserId, @DateOfBirth, @Gender, @Bio);
END;
