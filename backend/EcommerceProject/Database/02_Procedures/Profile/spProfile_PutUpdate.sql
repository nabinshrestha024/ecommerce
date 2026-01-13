USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spProfile_PutUpdate
    @UserId             INT,
    @FullName           VARCHAR(100),
    @Address            VARCHAR(500),
    @City               VARCHAR(100),
--    @ProfileImageUrl    VARCHAR(1024),
    @Bio                VARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Users
    SET
        FullName = @FullName,
        Address = @Address,
        City = @City,
--        ProfileImageUrl = @ProfileImageUrl,
        UpdatedAt = SYSUTCDATETIME()
    WHERE UserId = @UserId AND DeletedAt IS NULL;

    MERGE UserProfiles AS t
    USING (SELECT @UserId AS UserId) s
    ON t.UserId = s.UserId
    WHEN MATCHED THEN
        UPDATE SET
            Bio = @Bio
    WHEN NOT MATCHED THEN
        INSERT (UserId, Bio)      
        VALUES  (@UserId, @Bio);    
END;
