USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spPassword_MarkOtpUsed
    @OtpId INT
AS
BEGIN
    UPDATE PasswordResetOtps
    SET IsUsed = 1
    WHERE OtpId = @OtpId
END
