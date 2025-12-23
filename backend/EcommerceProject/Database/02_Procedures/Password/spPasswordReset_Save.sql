CREATE OR ALTER PROCEDURE spPasswordReset_Save
    @UserId INT,
    @Token NVARCHAR(500),
    @Expiry DATETIME
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM PasswordResetTokens WHERE UserId = @UserId;

    INSERT INTO PasswordResetTokens (UserId, Token, Expiry)
    VALUES (@UserId, @Token, @Expiry);
END
