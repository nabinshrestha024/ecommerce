CREATE OR ALTER PROCEDURE spPasswordReset_Reset
    @Token NVARCHAR(500),
    @NewPasswordHash NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @UserId INT;

    SELECT @UserId = UserId
    FROM PasswordResetTokens
    WHERE Token = @Token
      AND Expiry > GETUTCDATE();

    IF @UserId IS NOT NULL
    BEGIN
        UPDATE Users
        SET PasswordHash = @NewPasswordHash,
            UpdatedAt = GETUTCDATE()
        WHERE UserId = @UserId;

        DELETE FROM PasswordResetTokens WHERE Token = @Token;
    END
END
