CREATE PROCEDURE spUser_SaveRefreshToken
    @UserId INT,
    @RefreshToken VARCHAR(500)
AS
BEGIN
    UPDATE Users
    SET 
        RefreshToken = @RefreshToken,
        UpdatedAt = SYSUTCDATETIME()
    WHERE UserId = @UserId AND IsActive = 1;
END
GO