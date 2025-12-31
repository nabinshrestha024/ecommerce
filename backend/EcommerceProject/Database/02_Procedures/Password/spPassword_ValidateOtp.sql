USE [EcommerceDB];
GO


CREATE OR ALTER PROCEDURE spPassword_ValidateOtp
    @UserId INT,
    @OtpCode VARCHAR(6)
AS
BEGIN
    SELECT TOP 1 *
    FROM PasswordResetOtps
    WHERE UserId = @UserId
      AND OtpCode = @OtpCode
      AND IsUsed = 0
      AND ExpiresAt > GETUTCDATE()
END
