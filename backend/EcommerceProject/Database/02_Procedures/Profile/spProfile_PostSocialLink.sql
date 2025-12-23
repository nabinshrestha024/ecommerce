USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spProfile_PostSocialLink
    @UserId INT,
    @Platform VARCHAR(50),
    @ProfileUrl VARCHAR(300)
AS
BEGIN
    INSERT INTO UserSocialLinks (UserId, Platform, ProfileUrl)
    VALUES (@UserId, @Platform, @ProfileUrl);
END;
GO