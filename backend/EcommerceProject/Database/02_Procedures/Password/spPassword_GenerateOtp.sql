USE [EcommerceDB];
GO
CREATE OR ALTER PROCEDURE spPassword_GenerateOtp
    @UserId INT,
    @OtpCode VARCHAR(6),
    @ExpiresAt DATETIME
AS
BEGIN
    INSERT INTO PasswordResetOtps (UserId, OtpCode, ExpiresAt)
    VALUES (@UserId, @OtpCode, @ExpiresAt)
END
